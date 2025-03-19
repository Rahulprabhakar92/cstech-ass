"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import { useMemo } from "react";
import Agenttask from "@/components/Agenttask";



export default function Agents() {
    const { id } = useParams(); 
    const router = useRouter(); 
    const SearchParams=useSearchParams()
    const [tasks, setTasks] = useState<{
        agentId:String
        agentName:String|"",
        tasks:{
            id:String|"",
            FirstName:String|"",
            phone:String|"",
            notes:String|""
        }[]
    }[]>([]);
    const [agents, setAgents] = useState<
        { 
            _id:String|"",
            firstname: String|" ",
            email: String |"",
            mobileNumber: String|""; 
            password: String |"";
            tasks:[{
                id:String
            }]|[]
        }[]
    >([]);  

    const [open, setOpen] = useState(false);
    const [agentData, setAgentData] = useState({ firstname: "", email: "",countryCode:'',mobileNumber: "", password: "", tasks: [], createdBy: id });

    useEffect(() => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                router.push('http://localhost:3000/signin'); 
            }
        } catch (e) {
            alert(e);
        }
    }, [router]); 

    useEffect(() => {
        if (!id) return;
        fetchAgents();
    }, [id]); 




    useEffect(() => {
        if (SearchParams.get("returning") === "true") {
            fetchTasks()
            if(agents.length>0){
                const tasks= agents.map((agent)=>{
                agent.tasks.length
                })
            }
        }else{
            console.log("NOT wokring")
        }
    }, [SearchParams, router,agents]);

   

    const fetchAgents = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/agents?_id=${id}`);
            setAgents(res.data.agents);

        } catch (error) {
            console.error("Error fetching agents:", error);
        }
    };

    const fetchTasks=async()=>{
        const formatteddata= agents.map((agent) => ({
            agentId: agent._id,
            agentName:agent.firstname,
            tasksId: agent.tasks,
        }))

        try{

            const res=await axios.post(`http://localhost:3001/tasks`,formatteddata,{
                headers: {
                    'Content-Type': 'application/json',
                },
            })


          
            setTasks(res.data.responce);
        }catch(e){
            console.log(e)

        }

    }

 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3001/newAgent", agentData);
            setOpen(false);
            setAgentData({ firstname: "", email: "",countryCode:'',mobileNumber: "", password: "", tasks: [], createdBy: id });
            fetchAgents(); 
        } catch (error) {
            console.error("Error adding agent:", error);
        }
    };
    const uploadFile=async()=>{
        router.push(`http://localhost:3000/dashboard/${id}/upload`)
    }

    return (
        <div className="h-screen bg-gray-100 flex  ">
            <div className="h-screen bg-gray-100 flex justify-center items-center w-full gap-5">
                <Card className="bg-white w-[550px]">
                    <CardHeader className="flex justify-between items-center p-8">
                        <CardTitle className="text-bold text-2xl">Agents List</CardTitle>

                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-blue-600">Add Agent</Button>
                            </DialogTrigger>
                            <DialogContent className="bg-gray-50 text-black border-1">
                                <DialogHeader>
                                    <DialogTitle>Add New Agent</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                                    <Input type="text" placeholder="Name" value={agentData.firstname} onChange={(e) => setAgentData({ ...agentData, firstname: e.target.value })} required />
                                    <Input type="email" placeholder="Email" value={agentData.email} onChange={(e) => setAgentData({ ...agentData, email: e.target.value })} required />
                                    <div className="flex items-center gap-2">
                                        <PhoneInput
                                        country={"us"}
                                        placeholder="Code"
                                        value={agentData.countryCode}
                                        onChange={(value) => setAgentData({ ...agentData, countryCode: value })}
                                        inputStyle={{
                                            width: "100px", // Adjust width for the country code
                                            height: "40px",
                                            fontSize: "16px",
                                        }}
                                        />

                                        <Input
                                        type="text"
                                        placeholder="Mobile"
                                        value={agentData.mobileNumber}
                                        onChange={(e) =>
                                            setAgentData({ ...agentData, mobileNumber: e.target.value })
                                        }
                                        required
                                        className="w-full mt-5" // Makes sure the mobile number takes the remaining space
                                        />
                                    </div>
                                    <Input type="password" placeholder="Password" value={agentData.password} onChange={(e) => setAgentData({ ...agentData, password: e.target.value })} required />
                                    <Button type="submit" className="bg-gray-600">Save Agent</Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Mobile</TableHead>
                                    <TableHead>Tasks</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {agents.length > 0 ? (
                                    agents.map((agent, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{agent.firstname}</TableCell>
                                            <TableCell>{agent.email}</TableCell>
                                            <TableCell>{agent.mobileNumber}</TableCell>
                                            <TableCell>{agent.tasks.length}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3}>
                                            <div className="flex justify-center items-center h-20 flex-col">
                                                No agents added yet.
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}

                            </TableBody>
                        </Table>
                        <Button className="bg-blue-600 mt-5" onClick={uploadFile}>Upload file</Button>

                    </CardContent>
                </Card>
                <Agenttask tasks={tasks} />

            

            </div>

        </div>
    );
}
