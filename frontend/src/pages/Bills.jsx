import React, { useEffect, useState } from 'react';
import Electricity from './electricity.jpg';
import Water from './water.png';
import Netflix from './netflix.jpg';
import Creditcard from './creditcard.avif';
import Emi from './emi.png';
import Maintenance from './maintenance.jpg';
import { Appbar } from "../components/Appbar";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export function Bills() {
    const navigate = useNavigate();

    const [ids, setIds] = useState(["", "", "", "", "", ""]);
    const bills = ["Electricity", "Water", "Credit Card", "Netflix", "Maintenance", "EMI"];
    const [electricity, setElectricity] = useState("");
    const [water, setWater] = useState("");
    const [creditCard, setCreditCard] = useState("");
    const [netflix, setNetflix] = useState("");
    const [maintenance, setMaintenance] = useState("");
    const [emi, setEmi] = useState("");

    function getId(filter, setFilter) {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }).then((response) => {
            setFilter(response.data.users[0]._id);
        }).catch((error) => {
            console.error("Error fetching data for", filter, error);
        });
    }

    useEffect(() => {
        getId("Electricity", setElectricity);
        getId("Water", setWater);
        getId("Netflix", setNetflix);
        getId("EMI", setEmi);
        getId("Maintenance", setMaintenance);
        getId("Credit Card", setCreditCard);
    }, []);

    return (
        <div>
            <style>
                {`
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                
                .container {
                    max-width: 1200px;
                    margin: 50px auto;
                    padding: 20px;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-around;
                }
                
                .card {
                    width: calc(30% - 20px);
                    background-color: #fff;
                    padding: 20px;
                    margin-bottom: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s ease;
                }
                
                .card:hover {
                    transform: translateY(-5px);
                }
                
                .card h3 {
                    color: #333;
                    margin-top: 0;
                }
                
                .card img {
                    width: 100px;
                    margin-bottom: 10px;
                }
                
                .card p {
                    color: #555;
                    margin-bottom: 10px;
                }
                
                .card button {
                    display: block;
                    width: 100%;
                    padding: 8px 15px;
                    background-color: #007bff;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                
                .card button:hover {
                    background-color: #0056b3;
                }
                `}
            </style>
            <Appbar />
            <div className="container">
                <div className="card">
                    <img src={Electricity} alt="Electricity Bill" />
                    <h3>Electricity Bill</h3>
                    <p>Amount: ₹100</p>
                    <button onClick={(e) => {
                        navigate("/send?id=" + electricity + "&name=Electricity");
                    }}>Pay Now</button>
                </div>
                <div className="card">
                    <img src={Water} alt="Water Bill" />
                    <h3>Water Bill</h3>
                    <p>Amount: ₹500</p>
                    <button onClick={(e) => {
                        navigate("/send?id=" + water + "&name=Water");
                    }}>Pay Now</button>
                </div>
                <div className="card">
                    <img src={Netflix} alt="Netflix Subscription" />
                    <h3>Netflix Subscription</h3>
                    <p>Amount: ₹150</p>
                    <button onClick={(e) => {
                        navigate("/send?id=" + netflix + "&name=Netflix");
                    }}>Pay Now</button>
                </div>
                <div className="card">
                    <img src={Creditcard} alt="Credit Card Bill" />
                    <h3>Credit Card Bill</h3>
                    <p>Amount: ₹500</p>
                    <button onClick={(e) => {
                        navigate("/send?id=" + creditCard + "&name=Credit Card");
                    }}>Pay Now</button>
                </div>
                <div className="card">
                    <img src={Emi} alt="EMI Bill" />
                    <h3>EMI Bill</h3>
                    <p>Amount: ₹200</p>
                    <button onClick={(e) => {
                        navigate("/send?id=" + emi + "&name=EMI");
                    }}>Pay Now</button>
                </div>
                <div className="card">
                    <img src={Maintenance} alt="Maintenance Bill" />
                    <h3>Maintenance Bill</h3>
                    <p>Amount: ₹750</p>
                    <button onClick={(e) => {
                        navigate("/send?id=" + maintenance + "&name=Maintenance");
                    }}>Pay Now</button>
                </div>
            </div>
        </div>
    );
}



export default Bills;
