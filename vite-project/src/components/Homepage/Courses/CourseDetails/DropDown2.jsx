import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IconPack } from '../../../../constants/IconPack.js';

const DropDown2 = () => {
  const { currentCourse } = useSelector((state) => state?.courses);
  const [expandedModules, setExpandedModules] = useState({});
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showTest, setShowTest] = useState(false);

  if (!currentCourse) return null;

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const handleModuleSelect = (module) => {
    setSelectedModule(module);
    setSelectedLesson(module?.lessons[0]);
    setShowTest(false);
  };

  const handleLessonSelect = (lesson) => {
    setSelectedLesson(lesson);
    setShowTest(false);
  };

  const handleTestSelect = (module) => {
    setSelectedModule(module);
    setSelectedLesson(null);
    setShowTest(true);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 border-r overflow-y-auto p-4">
        {currentCourse?.modules?.map((module) => (
          <div key={module?.module_id} className="mb-2">
            <div 
              onClick={() => {
                toggleModule(module?.module_id);
                handleModuleSelect(module);
              }}
              className={`
                cursor-pointer p-2 rounded 
                ${selectedModule?.module_id === module?.module_id ? 'bg-blue-100' : 'hover:bg-gray-200'}
                flex justify-between items-center
              `}
            >
              <span>{module?.module_name}</span>
              <span className="text-sm text-gray-500">
                {expandedModules[module?.module_id] ? 
                  <img src={IconPack.dropdownIconup} alt="Collapse" /> : 
                  <img src={IconPack.dropdownIcon} alt="Expand" />}
              </span>
            </div>
            
            {expandedModules[module.module_id] && (
              <div className="pl-4 mt-2 space-y-1">
                {module?.lessons?.map((lesson) => (
                  <div
                    key={lesson.lesson_id}
                    onClick={() => handleLessonSelect(lesson)}
                    className={`
                      cursor-pointer p-1 rounded 
                      ${selectedLesson?.lesson_id === lesson.lesson_id ? 'bg-blue-200' : 'hover:bg-gray-200'}
                    `}
                  >
                    {lesson?.lesson_name}
                  </div>
                ))}
                <div
                  onClick={() => handleTestSelect(module)}
                  className="cursor-pointer p-1 text-green-600 hover:bg-gray-200 rounded"
                >
                  Test
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 bg-white overflow-y-auto">
        {showTest && selectedModule ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Test for {selectedModule?.module_name}</h2>
            <div className="text-gray-700">
              {selectedModule?.test?.questions?.map((question, index) => (
                <div key={question.question_id} className="mb-4">
                  <p className="font-semibold">Question {index + 1}: {question?.question_description}</p>
                  <div className="ml-4">
                    {question?.options?.map((option) => (
                      <div key={option.name} className="mb-1">
                        {option.name} {option.value ? '(Correct)' : ''}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : selectedLesson ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">{selectedLesson?.lesson_name}</h2>
            <div className="text-gray-700">{selectedLesson?.content}</div>
          </div>
        ) : (
          <div className="text-gray-500 text-center">Select a lesson or test to view details</div>
        )}
      </div>
    </div>
  );
};

export default DropDown2;