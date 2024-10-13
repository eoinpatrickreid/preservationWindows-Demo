// main.go

package main

import (
    "context"
    "fmt"
    "log"
    "os"
    "strconv"
    "strings"
    "time"

    "github.com/gofiber/fiber/v2"
    "github.com/gofiber/fiber/v2/middleware/cors"
    jwtware "github.com/gofiber/jwt/v3"
    // "github.com/joho/godotenv"
    "github.com/golang-jwt/jwt/v4"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/bson/primitive"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"

    "golang.org/x/crypto/bcrypt"
)

// Struct Definitions

type Room struct {
	Ref 		 string `json:"ref" bson:"ref"`
    RoomName      string `json:"roomName" bson:"roomname"`
    Width         int    `json:"width" bson:"width"`
    Height        int    `json:"height" bson:"height"`
    Putty         bool   `json:"putty" bson:"putty"`
    Mastic        bool   `json:"mastic" bson:"mastic"`
    Paint         bool   `json:"paint" bson:"paint"`
    Tenon         bool   `json:"tenon" bson:"tenon"`
    EC            bool   `json:"eC" bson:"eC"`
    Encapsulation int	`json:"encapsulation" bson:"encapsulation"`
    BottomRail    bool   `json:"bottomRail" bson:"bottomRail"`
    Dormer        bool   `json:"dormer" bson:"dormer"`
    PullyWheel    bool `json:"pullyWheel" bson:"pullyWheel"`
    PanesNumber   int    `json:"panesNumber" bson:"panesNumber"`
    StainRepairs  int    `json:"stainRepairs" bson:"stainRepairs"`
    Cill          string `json:"cill" bson:"cill"`
    Sash          string `json:"sash" bson:"sash"`
    Notes         string `json:"notes" bson:"notes"`
    Formation     string `json:"formation" bson:"formation"` 
	Count 	   int    `json:"count" bson:"count"`
	GlassType      string `json:"glassType" bson:"glassType"`
	Casement   bool `json:"casement" bson:"casement"`
	PriceChange   int	`json:"priceChange" bson:"priceChange"`
	PriceChangeNotes string `json:"priceChangeNotes" bson:"priceChangeNotes"`
	EasyClean bool `json:"easyClean" bson:"easyClean"`
	MasticPatch bool `json:"masticPatch" bson:"masticPatch"`
	OutsidePatch bool `json:"outsidePatch" bson:"outsidePatch"`
	ConcealedVent bool `json:"concealedVent" bson:"concealedVent"`
	Shutters 	bool `json:"shutters" bson:"shutters"`

}

// Update Job struct
type Job struct {
    ID                 primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
    QuoteID            string             `json:"quoteId" bson:"quoteId"` // QuoteID as string
    Completed          bool               `json:"completed" bson:"completed"`
    Date               string             `json:"date" bson:"date"`
    CustomerName       string             `json:"customerName" bson:"customername"`
    Address            string             `json:"address" bson:"address"`
    Email              string             `json:"email" bson:"email"`
    Phone              string             `json:"phone" bson:"phone"`
    PostCode           string             `json:"postCode" bson:"postcode"`
    Rooms              []Room             `json:"rooms" bson:"rooms"`
    Options            []string           `json:"options" bson:"options"`
    PlanningPermission string             `json:"planningPermission" bson:"planningPermission"`
}

type User struct {
    ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
    Username string             `json:"username" bson:"username"`
    Email    string             `json:"email" bson:"email"`
    Password string             `json:"password" bson:"password"` // Hashed password
}

type Counter struct {
    ID  string `bson:"_id"`
    Seq int    `bson:"seq"`
}

// Global Variables

var (
    jobCollection      *mongo.Collection
    userCollection     *mongo.Collection
    countersCollection *mongo.Collection // Added countersCollection
    jwtSecret          string
    tokenExpiryTime    = time.Hour * 72 // 72 hours
)

// JWT Claims Structure

type Claims struct {
    Email string `json:"email"`
    jwt.RegisteredClaims
}

// Main Function

func main() {
    // Load environment variables
    // err := godotenv.Load(".env")
    // if err != nil {
    //     log.Fatal("Error loading .env file: ", err)
    // }

    // Retrieve environment variables
    MONGODB_URI := os.Getenv("MONGODB_URI")
    PORT := os.Getenv("PORT")
    if PORT == "" {
        PORT = "5000"
    }
    jwtSecret = os.Getenv("JWT_SECRET")
    if jwtSecret == "" {
        log.Fatal("JWT_SECRET not set in .env file")
    }

    // Set MongoDB client options
    clientOptions := options.Client().ApplyURI(MONGODB_URI)

    // Connect to MongoDB
    client, err := mongo.Connect(context.Background(), clientOptions)
    if err != nil {
        log.Fatal("MongoDB connection error: ", err)
    }
    defer func() {
        if err = client.Disconnect(context.Background()); err != nil {
            log.Fatal("MongoDB disconnection error: ", err)
        }
    }()

    // Ping MongoDB to verify connection
    err = client.Ping(context.Background(), nil)
    if err != nil {
        log.Fatal("MongoDB ping error: ", err)
    }
    fmt.Println("Connected to MongoDB!")

    // Initialize collections
    jobCollection = client.Database("quote_db").Collection("jobs")
    userCollection = client.Database("quote_db").Collection("users")
    countersCollection = client.Database("quote_db").Collection("counters") // Initialize countersCollection

    // Initialize Fiber app
    app := fiber.New()

    // Set up CORS middleware
    app.Use(cors.New(cors.Config{
        AllowOrigins:     "*", // Adjust as needed
        AllowMethods:     "GET, POST, PUT, DELETE, PATCH",
        AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
        AllowCredentials: true,
    }))

    // Serve static files (if any)
    app.Static("/", "./client/dist")

    // Public Routes
    app.Post("/api/register", registerUser)
    app.Post("/api/login", loginUser)

    // JWT Middleware to protect routes below
    app.Use(jwtware.New(jwtware.Config{
        SigningKey:   []byte(jwtSecret),
        ErrorHandler: jwtError,
    }))

    // Protected Routes
    app.Get("/api/jobs", getJobs)
    app.Get("/api/jobs/:id", getJob)
    app.Post("/api/jobs", createJob)
    app.Put("/api/jobs/:id", updateJob)
    app.Delete("/api/jobs/:id", deleteJob)

    // Fallback handler for SPA
	app.Use(func(c *fiber.Ctx) error {
		if c.Path() == "/api" || strings.HasPrefix(c.Path(), "/api/") {
			return c.Next()
		}
		return c.SendFile("./client/dist/index.html")
	})
    // Start the server
    log.Fatal(app.Listen("0.0.0.0:" + PORT))
}

// Handler Functions

func getNextSequenceNumber(name string) (int, error) {
    filter := bson.M{"_id": name}
    update := bson.M{"$inc": bson.M{"seq": 1}}
    opts := options.FindOneAndUpdate().SetUpsert(true).SetReturnDocument(options.After)

    var counter Counter
    err := countersCollection.FindOneAndUpdate(context.Background(), filter, update, opts).Decode(&counter)
    if err != nil {
        return 0, err
    }

    return counter.Seq, nil
}

// registerUser handles user registration
func registerUser(c *fiber.Ctx) error {
	type Request struct {
		Username string `json:"username"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	var req Request
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Cannot parse JSON",
		})
	}

	// Basic validation
	if req.Username == "" || req.Email == "" || req.Password == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "All fields are required",
		})
	}

	// Check if user already exists
	count, err := userCollection.CountDocuments(context.Background(), bson.M{
		"email": req.Email,
	})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Database error",
		})
	}
	if count > 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "User already exists",
		})
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error hashing password",
		})
	}

	// Create user
	user := User{
		Username: req.Username,
		Email:    req.Email,
		Password: string(hashedPassword),
	}

	// Insert user into the database
	result, err := userCollection.InsertOne(context.Background(), user)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error creating user",
		})
	}

	user.ID = result.InsertedID.(primitive.ObjectID)
	user.Password = "" // Do not return the password

	return c.Status(fiber.StatusCreated).JSON(user)
}

// loginUser handles user authentication and JWT generation
func loginUser(c *fiber.Ctx) error {
	type Request struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	var req Request
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Cannot parse JSON",
		})
	}

	// Basic validation
	if req.Email == "" || req.Password == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "All fields are required",
		})
	}

	// Find user by email
	var user User
	err := userCollection.FindOne(context.Background(), bson.M{
		"email": req.Email,
	}).Decode(&user)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Invalid credentials",
		})
	}

	// Compare passwords
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password))
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Invalid credentials",
		})
	}

	// Generate JWT token
	expirationTime := time.Now().Add(tokenExpiryTime)
	claims := &Claims{
		Email: user.Email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Issuer:    "preservation-windows",
			Subject:   user.ID.Hex(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	t, err := token.SignedString([]byte(jwtSecret))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to generate token",
		})
	}

	return c.JSON(fiber.Map{
		"token": t,
	})
}

// jwtError handles JWT authentication errors
func jwtError(c *fiber.Ctx, err error) error {
	if err.Error() == "Missing or malformed JWT" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Missing or malformed JWT",
		})
	}
	return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
		"error": "Invalid or expired JWT",
	})
}

// getJobs retrieves all jobs (quotes) from the database
func getJobs(c *fiber.Ctx) error {
	var jobs []Job
	cursor, err := jobCollection.Find(context.Background(), bson.M{})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Database error",
		})
	}
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var job Job
		if err := cursor.Decode(&job); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Error decoding job data",
			})
		}
		jobs = append(jobs, job)
	}

	return c.JSON(jobs)
}

// getJob retrieves a single job by ID
func getJob(c *fiber.Ctx) error {
	id := c.Params("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid ID",
		})
	}

	filter := bson.M{"_id": objID}
	var job Job
	err = jobCollection.FindOne(context.Background(), filter).Decode(&job)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Could not find job",
		})
	}

	return c.JSON(job)
}

// main.go
func createJob(c *fiber.Ctx) error {
    collection := jobCollection // Use the global jobCollection

    var job Job

    // Parse the incoming request body into the job struct
    if err := c.BodyParser(&job); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": err.Error(),
        })
    }

    // Generate the next sequence number for the quote ID
    seq, err := getNextSequenceNumber("quoteId")
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": "Failed to generate quote ID",
        })
    }

    // Convert seq to string and assign to QuoteID
    job.QuoteID = strconv.Itoa(seq)

    // Insert the job into the collection
    result, err := collection.InsertOne(c.Context(), job)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": err.Error(),
        })
    }

    job.ID = result.InsertedID.(primitive.ObjectID)

    // Return the newly created job as JSON
    return c.Status(fiber.StatusCreated).JSON(job)
}

// updateJob updates an existing job by ID
func updateJob(c *fiber.Ctx) error {
	id := c.Params("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid ID",
		})
	}

	job := new(Job)
	if err := c.BodyParser(job); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid JSON",
		})
	}

	filter := bson.M{"_id": objID}
	update := bson.M{"$set": job}

	_, err = jobCollection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Could not update job",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Job updated"})
}

// deleteJob deletes a job by ID
func deleteJob(c *fiber.Ctx) error {
	id := c.Params("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid ID",
		})
	}

	filter := bson.M{"_id": objID}
	result, err := jobCollection.DeleteOne(context.Background(), filter)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Could not delete job",
		})
	}

	if result.DeletedCount == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Job not found",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Job deleted"})
}
