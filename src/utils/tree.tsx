import React, { useEffect, useState } from "react";
import ReactFlow, { Background, Controls, MiniMap, Node, Edge } from "react-flow-renderer";
import { getRelatedPositions } from "../ai/careerMatch";

const TreeComponent: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNodeData, setSelectedNodeData] = useState<any>(null); 

  useEffect(() => {
    const fetchData = async () => {
      const results = await getRelatedPositions();

      const relatedJobs = [
        { id: "4", label: results.relatedJob1a || "Related Job 1a", posting: results.relatedJob1aPosting || "https://ca.indeed.com" },
        { id: "5", label: results.relatedJob1b || "Related Job 1b", posting: results.relatedJob1bPosting || "https://ca.indeed.com" },
        { id: "6", label: results.relatedJob2a || "Related Job 2a", posting: results.relatedJob2aPosting || "https://ca.indeed.com" },
        { id: "7", label: results.relatedJob2b || "Related Job 2b", posting: results.relatedJob2bPosting || "https://ca.indeed.com" },
        { id: "8", label: results.relatedJob3a || "Related Job 3a", posting: results.relatedJob3aPosting || "https://ca.indeed.com" },
        { id: "9", label: results.relatedJob3b || "Related Job 3b", posting: results.relatedJob3bPosting || "https://ca.indeed.com" },
      ];

      const newNodes: Node[] = [
        {
          id: "1",
          data: { label: `${results.originalJob1}` },
          position: { x: 100, y: 50 },
          style: { backgroundColor: "#a6eaf3", color: "#000", borderRadius: "15px", padding: "20px", border: "1px solid #ccc" },
        },
        {
          id: "2",
          data: { label: `${results.originalJob2}` },
          position: { x: 500, y: -50},
          style: { backgroundColor: "#e9c3d3", color: "#000", borderRadius: "15px", padding: "20px", border: "1px solid #ccc" },
        },
        {
          id: "3",
          data: { label: `${results.originalJob3}` },
          position: { x: 900, y: 50 },
          style: { backgroundColor: "#efe7b1", color: "#000", borderRadius: "15px", padding: "20px", border: "1px solid #ccc" },
        },
      ];

      const relatedNodes: Node[] = relatedJobs.map((job, index) => ({
        id: job.id,
        data: {
          label: job.label,
          url: job.posting,  
        },
        position: { x: index * 200, y: index * 30 + 150 },  
        style: { backgroundColor: "#ffffff", color: "#000", borderRadius: "15px", padding: "20px", border: "1px solid #ccc" },
      }));

      const newEdges: Edge[] = [
        { id: "e1-4", source: "1", target: "4", animated: true, style: { stroke: "#11707c" } },
        { id: "e1-5", source: "1", target: "5", animated: true, style: { stroke: "#11707c" } },
        { id: "e2-6", source: "2", target: "6", animated: true, style: { stroke: "#833053" } },
        { id: "e2-7", source: "2", target: "7", animated: true, style: { stroke: "#833053" } },
        { id: "e3-8", source: "3", target: "8", animated: true, style: { stroke: "#86791c" } },
        { id: "e3-9", source: "3", target: "9", animated: true, style: { stroke: "#86791c" } },
      ];

      setNodes([...newNodes, ...relatedNodes]);
      setEdges(newEdges);
    };

    fetchData();
  }, []);

  const onNodeClick = (_event: React.MouseEvent, node: Node) => {
    setSelectedNodeData(node.data); 
  };

  return (
    <div style={{ width: "90vw", height: "60vh", backgroundColor: "#f0f0f0", padding: "20px", borderRadius: "10px" }}>
      <ReactFlow nodes={nodes} edges={edges} fitView onNodeClick={onNodeClick}>
        <MiniMap />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
      
      {selectedNodeData && (
        <div style={{ marginTop: "20px" }}>
          <h3>Selected Node Data:</h3>
          <p><strong>Label:</strong> {selectedNodeData.label}</p>
          {selectedNodeData.url && (
            <p><strong>Job Posting:</strong> <a href={selectedNodeData.url} target="_blank" rel="noopener noreferrer">{selectedNodeData.url}</a></p>
          )}
        </div>
      )}
    </div>
  );
};

export default TreeComponent;
