import React, { useEffect, useState } from "react";
import ReactFlow, { Background, Controls, MiniMap, Node, Edge } from "react-flow-renderer";
import { getRelatedPositions } from "../ai/careerMatch";

const TreeComponent: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch career match results
      const results = await getRelatedPositions();

      // Ensure the related jobs are available, fallback to a default if not
      const relatedJobs = [
        { id: "4", label: results.relatedJob1a || "Related Job 1a" },
        { id: "5", label: results.relatedJob1b || "Related Job 1b" },
        { id: "6", label: results.relatedJob2a || "Related Job 2a" },
        { id: "7", label: results.relatedJob2b || "Related Job 2b" },
        { id: "8", label: results.relatedJob3a || "Related Job 3a" },
        { id: "9", label: results.relatedJob3b || "Related Job 3b" },
      ];

      // Create the root job nodes
      const newNodes: Node[] = [
        {
          id: "1",
          data: { label: `${results.originalJob1}` },
          position: { x: 100, y: 50 },
          style: { backgroundColor: "#ffffff", color: "#000", borderRadius: "15px", padding: "20px", border: "1px solid #ccc" },
        },
        {
          id: "2",
          data: { label: `${results.originalJob2}` },
          position: { x: 300, y: 50 },
          style: { backgroundColor: "#ffffff", color: "#000", borderRadius: "15px", padding: "20px", border: "1px solid #ccc" },
        },
        {
          id: "3",
          data: { label: `${results.originalJob3}` },
          position: { x: 500, y: 50 },
          style: { backgroundColor: "#ffffff", color: "#000", borderRadius: "15px", padding: "20px", border: "1px solid #ccc" },
        },
      ];

      // Create the related job nodes
      const relatedNodes: Node[] = relatedJobs.map((job, index) => ({
        id: job.id,
        data: { label: job.label },
        position: { x: 150 + index * 200, y: 200 }, // Adjust positions with spacing
        style: { backgroundColor: "#ffffff", color: "#000", borderRadius: "15px", padding: "20px", border: "1px solid #ccc" },
      }));

      // Create the edges connecting original jobs to related jobs
      const newEdges: Edge[] = [
        { id: "e1-4", source: "1", target: "4", animated: true, style: { stroke: "#000" } },
        { id: "e1-5", source: "1", target: "5", animated: true, style: { stroke: "#000" } },
        { id: "e2-6", source: "2", target: "6", animated: true, style: { stroke: "#000" } },
        { id: "e2-7", source: "2", target: "7", animated: true, style: { stroke: "#000" } },
        { id: "e3-8", source: "3", target: "8", animated: true, style: { stroke: "#000" } },
        { id: "e3-9", source: "3", target: "9", animated: true, style: { stroke: "#000" } },
      ];

      // Combine the root and related nodes
      setNodes([...newNodes, ...relatedNodes]);
      setEdges(newEdges);
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: "90vw", height: "60vh", backgroundColor: "#f0f0f0", padding: "20px", borderRadius: "10px" }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <MiniMap />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default TreeComponent;
