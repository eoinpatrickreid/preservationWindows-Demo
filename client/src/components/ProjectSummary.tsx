import React from "react";
import { Job } from "../interfaces";

interface SummaryProps {
    job: Job;
}
const ProjectSummary: React.FC<SummaryProps> = ({ job }) => {
    return (
        <header>
        <h1>Quote for {job.customerName}</h1>
        <p><strong>Date:</strong> {job.date}</p>
        <p><strong>Address:</strong> {job.address}</p>
        <p><strong>Email:</strong> {job.email}</p>
        <p><strong>Phone:</strong> {job.phone}</p>
        <p><strong>PostCode:</strong> {job.postCode}</p>
    </header>
    );
};
export default ProjectSummary;