import React, { useState, useRef, useCallback } from 'react';
import { Plus, ArrowRight, Type, User, Save, Download } from 'lucide-react';

interface FlowElement {
  id: string;
  type: 'rectangle' | 'oval' | 'diamond' | 'arrow' | 'text' | 'actor';
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  color: string;
}

const FlowChart: React.FC = () => {
  const [elements, setElements] = useState<FlowElement[]>([
    {
      id: '1',
      type: 'actor',
      x: 350,
      y: 300,
      width: 80,
      height: 100,
      text: 'Actor',
      color: '#ffffff',
    },
    {
      id: '2',
      type: 'rectangle',
      x: 550,
      y: 350,
      width: 120,
      height: 60,
      text: 'Process',
      color: '#ffffff',
    },
    {
      id: '3',
      type: 'oval',
      x: 750,
      y: 300,
      width: 150,
      height: 80,
      text: 'Decision',
      color: '#ffffff',
    },
  ]);

  const [selectedTool, setSelectedTool] = useState<string>('select');
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const tools = [
    { id: 'select', icon: '↖', label: 'Select' },
    { id: 'rectangle', icon: '▭', label: 'Rectangle' },
    { id: 'oval', icon: '○', label: 'Oval' },
    { id: 'diamond', icon: '◇', label: 'Diamond' },
    { id: 'arrow', icon: '→', label: 'Arrow' },
    { id: 'text', icon: 'T', label: 'Text' },
    { id: 'actor', icon: '🚶', label: 'Actor' },
  ];

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (selectedTool === 'select') return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newElement: FlowElement = {
      id: Date.now().toString(),
      type: selectedTool as FlowElement['type'],
      x: x - 50,
      y: y - 25,
      width: selectedTool === 'actor' ? 80 : selectedTool === 'arrow' ? 100 : 100,
      height: selectedTool === 'actor' ? 100 : selectedTool === 'arrow' ? 20 : 50,
      text: selectedTool === 'actor' ? 'Actor' : selectedTool === 'text' ? 'Text' : 'Label',
      color: '#ffffff',
    };

    setElements([...elements, newElement]);
    setSelectedTool('select');
  }, [selectedTool, elements]);

  const handleElementMouseDown = useCallback((e: React.MouseEvent, elementId: string) => {
    e.stopPropagation();
    const element = elements.find(el => el.id === elementId);
    if (!element) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    setSelectedElement(elementId);
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - rect.left - element.x,
      y: e.clientY - rect.top - element.y,
    });
  }, [elements]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !selectedElement) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const newX = e.clientX - rect.left - dragOffset.x;
    const newY = e.clientY - rect.top - dragOffset.y;

    setElements(elements.map(el =>
      el.id === selectedElement
        ? { ...el, x: Math.max(0, newX), y: Math.max(0, newY) }
        : el
    ));
  }, [isDragging, selectedElement, dragOffset, elements]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  }, []);

  const updateElementText = (elementId: string, newText: string) => {
    setElements(elements.map(el =>
      el.id === elementId ? { ...el, text: newText } : el
    ));
  };

  const deleteElement = (elementId: string) => {
    setElements(elements.filter(el => el.id !== elementId));
    setSelectedElement(null);
  };

  const renderElement = (element: FlowElement) => {
    const isSelected = selectedElement === element.id;
    
    switch (element.type) {
      case 'rectangle':
        return (
          <div
            key={element.id}
            className={`absolute border-2 border-white bg-transparent cursor-move flex items-center justify-center text-white text-sm font-medium ${
              isSelected ? 'ring-2 ring-blue-400' : ''
            }`}
            style={{
              left: element.x,
              top: element.y,
              width: element.width,
              height: element.height,
            }}
            onMouseDown={(e) => handleElementMouseDown(e, element.id)}
            onDoubleClick={() => {
              const newText = prompt('Enter text:', element.text);
              if (newText !== null) updateElementText(element.id, newText);
            }}
          >
            {element.text}
          </div>
        );

      case 'oval':
        return (
          <div
            key={element.id}
            className={`absolute border-2 border-white bg-transparent cursor-move flex items-center justify-center text-white text-sm font-medium ${
              isSelected ? 'ring-2 ring-blue-400' : ''
            }`}
            style={{
              left: element.x,
              top: element.y,
              width: element.width,
              height: element.height,
              borderRadius: '50%',
            }}
            onMouseDown={(e) => handleElementMouseDown(e, element.id)}
            onDoubleClick={() => {
              const newText = prompt('Enter text:', element.text);
              if (newText !== null) updateElementText(element.id, newText);
            }}
          >
            {element.text}
          </div>
        );

      case 'diamond':
        return (
          <div
            key={element.id}
            className={`absolute cursor-move flex items-center justify-center text-white text-sm font-medium ${
              isSelected ? 'ring-2 ring-blue-400' : ''
            }`}
            style={{
              left: element.x,
              top: element.y,
              width: element.width,
              height: element.height,
              transform: 'rotate(45deg)',
              border: '2px solid white',
              backgroundColor: 'transparent',
            }}
            onMouseDown={(e) => handleElementMouseDown(e, element.id)}
            onDoubleClick={() => {
              const newText = prompt('Enter text:', element.text);
              if (newText !== null) updateElementText(element.id, newText);
            }}
          >
            <span style={{ transform: 'rotate(-45deg)' }}>{element.text}</span>
          </div>
        );

      case 'actor':
        return (
          <div
            key={element.id}
            className={`absolute cursor-move text-white ${
              isSelected ? 'ring-2 ring-blue-400' : ''
            }`}
            style={{
              left: element.x,
              top: element.y,
              width: element.width,
              height: element.height,
            }}
            onMouseDown={(e) => handleElementMouseDown(e, element.id)}
            onDoubleClick={() => {
              const newText = prompt('Enter text:', element.text);
              if (newText !== null) updateElementText(element.id, newText);
            }}
          >
            {/* Stick figure */}
            <svg width="80" height="100" viewBox="0 0 80 100" className="text-white">
              <circle cx="40" cy="15" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
              <line x1="40" y1="25" x2="40" y2="70" stroke="currentColor" strokeWidth="2" />
              <line x1="40" y1="35" x2="20" y2="50" stroke="currentColor" strokeWidth="2" />
              <line x1="40" y1="35" x2="60" y2="50" stroke="currentColor" strokeWidth="2" />
              <line x1="40" y1="70" x2="25" y2="90" stroke="currentColor" strokeWidth="2" />
              <line x1="40" y1="70" x2="55" y2="90" stroke="currentColor" strokeWidth="2" />
            </svg>
            <div className="text-center text-sm font-medium mt-1">{element.text}</div>
          </div>
        );

      case 'arrow':
        return (
          <div
            key={element.id}
            className={`absolute cursor-move ${
              isSelected ? 'ring-2 ring-blue-400' : ''
            }`}
            style={{
              left: element.x,
              top: element.y,
              width: element.width,
              height: element.height,
            }}
            onMouseDown={(e) => handleElementMouseDown(e, element.id)}
          >
            <svg width={element.width} height={element.height} className="text-white">
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                </marker>
              </defs>
              <line
                x1="0"
                y1={element.height / 2}
                x2={element.width - 10}
                y2={element.height / 2}
                stroke="currentColor"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
            </svg>
          </div>
        );

      case 'text':
        return (
          <div
            key={element.id}
            className={`absolute cursor-move text-white text-sm font-medium ${
              isSelected ? 'ring-2 ring-blue-400' : ''
            }`}
            style={{
              left: element.x,
              top: element.y,
              width: element.width,
              height: element.height,
            }}
            onMouseDown={(e) => handleElementMouseDown(e, element.id)}
            onDoubleClick={() => {
              const newText = prompt('Enter text:', element.text);
              if (newText !== null) updateElementText(element.id, newText);
            }}
          >
            {element.text}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Flow Chart</h2>
          <div className="flex space-x-2">
            <button className="p-2 hover:bg-gray-700 rounded">
              <Save className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-gray-700 rounded">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Type / to search"
            className="w-full bg-gray-800 text-white px-3 py-2 rounded text-sm"
          />
        </div>

        {/* Scratchpad */}
        <div className="border border-gray-600 rounded p-3">
          <h3 className="text-sm font-medium mb-2">Scratchpad</h3>
          <div className="border-2 border-dashed border-gray-600 rounded p-4 text-center text-gray-400 text-sm">
            Drag elements here
          </div>
        </div>

        {/* Tools */}
        <div>
          <h3 className="text-sm font-medium mb-3">General</h3>
          <div className="grid grid-cols-4 gap-2">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className={`p-3 rounded border border-gray-600 hover:bg-gray-700 text-center ${
                  selectedTool === tool.id ? 'bg-blue-600 border-blue-500' : ''
                }`}
                title={tool.label}
              >
                <span className="text-lg">{tool.icon}</span>
              </button>
            ))}
          </div>
        </div>

        {/* More Shapes Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center">
          <Plus className="w-4 h-4 mr-2" />
          More Shapes
        </button>

        {/* Selected Element Properties */}
        {selectedElement && (
          <div className="border-t border-gray-600 pt-4">
            <h3 className="text-sm font-medium mb-2">Properties</h3>
            <button
              onClick={() => deleteElement(selectedElement)}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded text-sm"
            >
              Delete Element
            </button>
          </div>
        )}
      </div>

      {/* Canvas */}
      <div className="flex-1 relative overflow-hidden">
        <div
          ref={canvasRef}
          className="w-full h-full bg-gray-800 relative cursor-crosshair"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
          onClick={handleCanvasClick}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {elements.map(renderElement)}
          
          {/* Instructions */}
          {elements.length === 3 && (
            <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-4 rounded">
              <p className="text-sm">
                • Click on tools in the sidebar, then click on canvas to add elements
                • Drag elements to move them
                • Double-click elements to edit text
                • Select elements to see properties
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlowChart;