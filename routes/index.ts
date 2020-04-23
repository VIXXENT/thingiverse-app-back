import express from "express";
import routes from "./routes";

export default function(app:express.Application){
    routes(app);
}