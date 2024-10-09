// src/components/BackgroundShapes.tsx

interface BackgroundShapesProps {
    isDarkMode: boolean
  }
  
  function BackgroundShapes({ }: BackgroundShapesProps) {
    return (
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Blob 1 */}
        <div
          className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px]
          bg-blue-500 opacity-30 rounded-full
          mix-blend-multiply filter blur-3xl animate-random-move"
        ></div>
  
        {/* Blob 2 */}
        <div
          className="absolute top-1/2 right-[-150px] w-[500px] h-[500px]
          bg-indigo-500 opacity-25 rounded-full
          mix-blend-multiply filter blur-3xl animate-random-move animation-delay-1000"
        ></div>
  
        {/* Blob 3 */}
        <div
          className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px]
          bg-teal-500 opacity-20 rounded-full
          mix-blend-multiply filter blur-3xl animate-random-move animation-delay-2000"
        ></div>
  
        {/* Blob 4 (Center Blob) */}
        <div
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px]
          bg-cyan-500 opacity-15 rounded-full
          transform -translate-x-1/2 -translate-y-1/2 mix-blend-multiply filter blur-3xl
          animate-random-move-center animation-delay-3000"
        ></div>
      </div>
    )
  }
  
  export default BackgroundShapes
  