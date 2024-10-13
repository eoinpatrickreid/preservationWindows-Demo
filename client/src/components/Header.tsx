import React from "react";
import { Job } from "../interfaces";

interface HeaderProps {
    job: Job;
}
const Header: React.FC<HeaderProps> = ({ job }) => {
    return (
        <header>
        <p><strong>Date:</strong> {job.date}</p>
        <p> {job.address}</p>
        <p> {job.postCode}</p>
        <p>Client: {job.customerName}</p>
        <p>ID: {job._id}</p>
        <p>planning permission</p>
    </header>
    );
};
export default Header;