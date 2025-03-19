"use client";


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


export default function Agenttask({tasks}:{tasks:any[]}){

    return (
        <div>
        {tasks.length > 0 &&
            tasks.map((agent:any) => (
                <Card key={agent.agentId} className="bg-white w-full max-w-3xl shadow-lg rounded-lg mt-5">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">
                            Tasks for Agent: {agent.agentName}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Task ID</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Notes</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {agent.tasks.map((task:any) => (
                                    <TableRow key={task._id}>
                                        <TableCell>{task._id}</TableCell>
                                        <TableCell>{task.FirstName}</TableCell>
                                        <TableCell>{task.phone}</TableCell>
                                        <TableCell>{task.notes}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            ))
        }
        </div>
    )
}