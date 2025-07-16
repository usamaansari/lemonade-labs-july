"use client";

import React, { useState } from 'react';

export default function KidsWebsiteBuilder() {
  const [viewMode, setViewMode] = useState('desktop');
  const [activeElement, setActiveElement] = useState(null);
  const [website, setWebsite] = useState({
    title: 'My Awesome Website',
    elements: [
      {
        id: 'logo-1',
        type: 'logo',
        content: '🍋 LEMONADE LABS',
        style: {
          fontSize: '24px',
          color: '#22c55e',
          textAlign: 'center',
          padding: '20px',
          fontWeight: 'bold'
        }
      }
    ]
  });

  const [draggedElement, setDraggedElement] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const elementTypes = [
    { id: 'button', name: 'Button', icon: '🔘', color: 'bg-blue-100' },
    { id: 'text', name: 'Text', icon: '📝', color: 'bg-purple-100' },
    { id: 'image', name: 'Image', icon: '🖼️', color: 'bg-green-100' },
    { id: 'video', name: 'Video', icon: '🎬', color: 'bg-yellow-100' }
  ];

  const layouts = [
    { id: 'column', name: 'Column', icon: '📄', color: 'bg-purple-100' },
    { id: '2-column', name: '2 Column', icon: '📰', color: 'bg-purple-100' },
    { id: '3-column', name: '3 Column', icon: '📊', color: 'bg-purple-100' }
  ];

  const templates = [
    { id: 'lemonade', name: 'Lemonade Stand', emoji: '🍋', color: 'bg-yellow-100' },
    { id: 'dogwalk', name: 'Dog Walking', emoji: '🐕', color: 'bg-blue-100' },
    { id: 'artshop', name: 'Art Shop', emoji: '🎨', color: 'bg-pink-100' },
    { id: 'bakery', name: 'Cupcake Shop', emoji: '🧁', color: 'bg-purple-100' }
  ];

  const handleDragStart = (e, elementType) => {
    setDraggedElement(elementType);
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/plain', JSON.stringify(elementType));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    if (draggedElement) {
      const newElement = {
        id: `${draggedElement.id}-${Date.now()}`,
        type: draggedElement.id,
        content: getDefaultContent(draggedElement.id),
        style: getDefaultStyle(draggedElement.id)
      };
      
      setWebsite(prev => ({
        ...prev,
        elements: [...prev.elements, newElement]
      }));
      
      setDraggedElement(null);
    }
  };

  const getDefaultContent = (type) => {
    switch (type) {
      case 'button':
        return 'Sample Button';
      case 'text':
        return 'SAMPLE TEXT';
      case 'image':
        return '🖼️ Image Placeholder';
      case 'video':
        return '🎬 Video Placeholder';
      default:
        return 'New Element';
    }
  };

  const getDefaultStyle = (type) => {
    switch (type) {
      case 'button':
        return {
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '25px',
          border: 'none',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          margin: '10px',
          display: 'inline-block'
        };
      case 'text':
        return {
          backgroundColor: '#dc2626',
          color: 'white',
          padding: '15px 30px',
          fontSize: '18px',
          fontWeight: 'bold',
          textAlign: 'center',
          margin: '10px',
          display: 'inline-block'
        };
      case 'image':
        return {
          width: '100px',
          height: '100px',
          backgroundColor: '#f3f4f6',
          border: '2px dashed #9ca3af',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          margin: '10px',
          borderRadius: '8px'
        };
      case 'video':
        return {
          width: '200px',
          height: '120px',
          backgroundColor: '#1f2937',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          margin: '10px',
          borderRadius: '8px'
        };
      default:
        return { margin: '10px' };
    }
  };

  const updateElementStyle = (elementId, newStyle) => {
    setWebsite(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === elementId 
          ? { ...el, style: { ...el.style, ...newStyle } }
          : el
      )
    }));
  };

  const updateElementContent = (elementId, newContent) => {
    setWebsite(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === elementId 
          ? { ...el, content: newContent }
          : el
      )
    }));
  };

  const deleteElement = (elementId) => {
    setWebsite(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== elementId)
    }));
    setActiveElement(null);
  };

  const applyTemplate = (templateId) => {
    const templateData = {
      lemonade: {
        title: 'My Lemonade Stand',
        elements: [
          {
            id: 'logo-1',
            type: 'logo',
            content: '🍋 LEMONADE LABS',
            style: { fontSize: '28px', color: '#eab308', textAlign: 'center', padding: '20px', fontWeight: 'bold' }
          },
          {
            id: 'hero-1',
            type: 'text',
            content: 'Fresh Lemonade - Only $1!',
            style: { backgroundColor: '#fef3c7', color: '#92400e', padding: '20px', fontSize: '24px', fontWeight: 'bold', textAlign: 'center', margin: '20px 0', borderRadius: '12px' }
          },
          {
            id: 'button-1',
            type: 'button',
            content: 'Order Now!',
            style: { backgroundColor: '#eab308', color: 'white', padding: '15px 30px', borderRadius: '25px', border: 'none', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', margin: '10px' }
          }
        ]
      },
      dogwalk: {
        title: 'Dog Walking Service',
        elements: [
          {
            id: 'logo-1',
            type: 'logo',
            content: '🐕 HAPPY PAWS',
            style: { fontSize: '28px', color: '#3b82f6', textAlign: 'center', padding: '20px', fontWeight: 'bold' }
          },
          {
            id: 'hero-1',
            type: 'text',
            content: 'Professional Dog Walking - $5/walk',
            style: { backgroundColor: '#dbeafe', color: '#1e40af', padding: '20px', fontSize: '20px', fontWeight: 'bold', textAlign: 'center', margin: '20px 0', borderRadius: '12px' }
          },
          {
            id: 'button-1',
            type: 'button',
            content: 'Book a Walk',
            style: { backgroundColor: '#3b82f6', color: 'white', padding: '15px 30px', borderRadius: '25px', border: 'none', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', margin: '10px' }
          }
        ]
      }
    };

    if (templateData[templateId]) {
      setWebsite(templateData[templateId]);
      setActiveElement(null);
    }
  };

  const renderElement = (element) => {
    const isActive = activeElement?.id === element.id;
    const containerStyle = {
      position: 'relative',
      display: 'inline-block',
      border: isActive ? '2px solid #3b82f6' : '2px solid transparent',
      borderRadius: '4px',
      margin: '4px'
    };

    const deleteButton = isActive ? (
      <button 
        onClick={() => deleteElement(element.id)}
        style={{
          position: 'absolute',
          top: '-10px',
          right: '-10px',
          background: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          cursor: 'pointer',
          fontSize: '12px',
          zIndex: 10
        }}
      >
        ×
      </button>
    ) : null;

    switch (element.type) {
      case 'button':
        return (
          <div style={containerStyle}>
            <button 
              style={element.style}
              onClick={() => setActiveElement(element)}
            >
              {element.content}
            </button>
            {deleteButton}
          </div>
        );

      case 'text':
        return (
          <div style={containerStyle}>
            <div 
              style={element.style}
              onClick={() => setActiveElement(element)}
            >
              {element.content}
            </div>
            {deleteButton}
          </div>
        );

      case 'image':
        return (
          <div style={containerStyle}>
            <div 
              style={element.style}
              onClick={() => setActiveElement(element)}
            >
              {element.content}
            </div>
            {deleteButton}
          </div>
        );

      case 'video':
        return (
          <div style={containerStyle}>
            <div 
              style={element.style}
              onClick={() => setActiveElement(element)}
            >
              {element.content}
            </div>
            {deleteButton}
          </div>
        );

      case 'logo':
        return (
          <div style={containerStyle}>
            <div 
              style={element.style}
              onClick={() => setActiveElement(element)}
            >
              {element.content}
            </div>
            {deleteButton}
          </div>
        );

      default:
        return (
          <div style={containerStyle}>
            <div style={element.style}>{element.content}</div>
            {deleteButton}
          </div>
        );
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">🍋</div>
              <span className="text-sm font-medium text-gray-600">LEMONADE LABS</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
              Kids Website Builder
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setViewMode('desktop')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'desktop' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              💻 Desktop
            </button>
            <button 
              onClick={() => setViewMode('mobile')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'mobile' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📱 Mobile
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            {/* Templates */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">🎨 Templates</h3>
              <div className="space-y-2">
                {templates.map(template => (
                  <div
                    key={template.id}
                    className={`p-3 rounded-lg cursor-pointer hover:shadow-md transition-shadow ${template.color}`}
                    onClick={() => applyTemplate(template.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{template.emoji}</div>
                      <span className="text-sm font-medium">{template.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Layouts */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">📐 Layouts</h3>
              <div className="space-y-2">
                {layouts.map(layout => (
                  <div
                    key={layout.id}
                    className={`p-3 rounded-lg cursor-pointer hover:shadow-md transition-shadow ${layout.color}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, layout)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-lg">{layout.icon}</div>
                      <span className="text-sm font-medium">{layout.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Elements */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">🧩 Elements</h3>
              <div className="space-y-2">
                {elementTypes.map(element => (
                  <div
                    key={element.id}
                    className={`p-3 rounded-lg cursor-grab hover:shadow-md transition-shadow ${element.color}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, element)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-lg">{element.icon}</div>
                      <span className="text-sm font-medium">{element.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 flex">
          <div className="flex-1 p-8 overflow-y-auto">
            <div className={`mx-auto bg-white rounded-lg shadow-lg min-h-96 ${
              viewMode === 'desktop' ? 'max-w-4xl' : 'max-w-sm'
            }`}>
              <div
                className={`p-6 min-h-96 transition-all duration-200 ${
                  dragOver ? 'bg-blue-50 border-2 border-dashed border-blue-300' : ''
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {website.elements.map(element => (
                  <div key={element.id} className="mb-4">
                    {renderElement(element)}
                  </div>
                ))}
                
                {website.elements.length === 1 && (
                  <div className="text-center py-16 text-gray-400">
                    <div className="text-6xl mb-4">🎯</div>
                    <p className="text-lg mb-2">Drag elements here to build your website!</p>
                    <p className="text-sm">Try dragging a button or text from the sidebar</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Settings */}
          <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4">⚙️ Settings</h3>
              
              {activeElement ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content
                    </label>
                    <input
                      type="text"
                      value={activeElement.content}
                      onChange={(e) => updateElementContent(activeElement.id, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  {(activeElement.type === 'button' || activeElement.type === 'text') && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Background Color
                        </label>
                        <input
                          type="color"
                          value={activeElement.style.backgroundColor || '#3b82f6'}
                          onChange={(e) => updateElementStyle(activeElement.id, { backgroundColor: e.target.value })}
                          className="w-full h-10 rounded-lg border border-gray-300"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Border Radius (0px)
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="50"
                          value={parseInt(activeElement.style.borderRadius) || 0}
                          onChange={(e) => updateElementStyle(activeElement.id, { borderRadius: `${e.target.value}px` })}
                          className="w-full"
                        />
                        <span className="text-sm text-gray-500">{activeElement.style.borderRadius || '0px'}</span>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Text Color
                    </label>
                    <input
                      type="color"
                      value={activeElement.style.color || '#000000'}
                      onChange={(e) => updateElementStyle(activeElement.id, { color: e.target.value })}
                      className="w-full h-10 rounded-lg border border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Font Size
                    </label>
                    <input
                      type="range"
                      min="12"
                      max="48"
                      value={parseInt(activeElement.style.fontSize) || 16}
                      onChange={(e) => updateElementStyle(activeElement.id, { fontSize: `${e.target.value}px` })}
                      className="w-full"
                    />
                    <span className="text-sm text-gray-500">{activeElement.style.fontSize || '16px'}</span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Padding
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="50"
                      value={parseInt(activeElement.style.padding?.split('px')[0]) || 10}
                      onChange={(e) => updateElementStyle(activeElement.id, { padding: `${e.target.value}px` })}
                      className="w-full"
                    />
                    <span className="text-sm text-gray-500">{activeElement.style.padding || '10px'}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <div className="text-4xl mb-4">👆</div>
                  <p>Click on an element to edit it!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex justify-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            <span>▶️</span>
            <span>Preview</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <span>💾</span>
            <span>Save</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
            <span>↶</span>
            <span>Undo</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
            <span>↷</span>
            <span>Redo</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
            <span>🚀</span>
            <span>Publish Website</span>
          </button>
        </div>
      </div>
    </div>
  );
}