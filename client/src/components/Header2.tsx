import React from "react";
import { Job } from "../interfaces";

interface HeaderProps {
    job: Job;
}
const Header2: React.FC<HeaderProps> = ({ job }) => {
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
export default Header2;