import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentLesson, setCurrentModule, setShowTest } from '../../../../Redux/Slice/CoursesSlice';
import { IconPack } from '../../../../constants/IconPack.js';

const DropDown = () => {
  const dispatch = useDispatch();
  const { currentCourse } = useSelector((state) => state.courses);
  
  // Create local state copies
  const [localCourse, setLocalCourse] = useState(null);
  const [currentModule, setCurrentLocalModule] = useState(null);
  const [currentLesson, setCurrentLocalLesson] = useState(null);
  const [expandedModules, setExpandedModules] = useState({});

  // Sync local state with Redux state on component mount or course change
  useEffect(() => {
    if (currentCourse) {
      setLocalCourse({ ...currentCourse });
      
      // Set initial module and lesson
      const firstModule = currentCourse.modules[0];
      const firstLesson = firstModule?.lessons[0];
      
      setCurrentLocalModule(firstModule);
      setCurrentLocalLesson(firstLesson);
    }
  }, [currentCourse]);

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const handleModuleSelect = (module) => {
    // Update local state
    setCurrentLocalModule(module);
    
    // Update first lesson of the module
    const firstLesson = module.lessons[0];
    setCurrentLocalLesson(firstLesson);
    
    // Dispatch Redux actions
    dispatch(setCurrentModule({ module_id: module.module_id }));
    dispatch(setCurrentLesson({ lesson_id: firstLesson.lesson_id }));
  };

  const handleLessonSelect = (lesson) => {
    // Update local state
    setCurrentLocalLesson(lesson);
    
    // Dispatch Redux action
    dispatch(setCurrentLesson({ lesson_id: lesson.lesson_id }));
  };

  const handleTestSelect = (module) => {
    // Update local state
    setCurrentLocalModule(module);
    
    // Dispatch Redux actions
    dispatch(setCurrentModule({ module_id: module.module_id }));
    dispatch(setShowTest(true));
  };

  // Render nothing if no course is loaded
  if (!localCourse) return null;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 border-r overflow-y-auto p-4">
        {localCourse.modules?.map((module) => (
          <div key={module.module_id} className="mb-2">
            <div 
              onClick={() => {
                toggleModule(module.module_id);
                handleModuleSelect(module);
              }}
              className={`
                cursor-pointer p-2 rounded 
                ${currentModule?.module_id === module.module_id ? 'bg-blue-100' : 'hover:bg-gray-200'}
                flex justify-between items-center
              `}
            >
              <span>{module.module_name}</span>
              <span className="text-sm text-gray-500">
                {expandedModules[module.module_id] ? 
                  <img src={IconPack.dropdownIconup} alt="Collapse" /> : 
                  <img src={IconPack.dropdownIcon} alt="Expand" />}
              </span>
            </div>
            
            {expandedModules[module.module_id] && (
              <div className="pl-4 mt-2 space-y-1">
                {module.lessons.map((lesson) => (
                  <div
                    key={lesson.lesson_id}
                    onClick={() => handleLessonSelect(lesson)}
                    className={`
                      cursor-pointer p-1 rounded 
                      ${currentLesson?.lesson_id === lesson.lesson_id ? 'bg-blue-200' : 'hover:bg-gray-200'}
                    `}
                  >
                    {lesson.lesson_name}
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
        {currentLesson ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">{currentLesson.lesson_name}</h2>
            <div className="text-gray-700">{currentLesson.content}</div>
          </div>
        ) : (
          <div className="text-gray-500 text-center">Select a lesson to view details</div>
        )}
      </div>
    </div>
  );
};

export default DropDown;