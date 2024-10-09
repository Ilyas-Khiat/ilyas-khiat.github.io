// src/components/NavButton.tsx
interface NavButtonProps {
    name: string
    icon: React.ReactNode
    activeButton: string | null
    handleButtonClick: (buttonName: string) => void
  }
  
  function NavButton({ name, icon, activeButton, handleButtonClick }: NavButtonProps) {
    return (
      <button
        className={`flex items-center text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-full transition-all duration-300 px-4 py-2 ${
          activeButton === name ? 'bg-blue-500/20 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : ''
        }`}
        onClick={() => handleButtonClick(name)}
      >
        {icon}
        <span className="ml-2 sm:inline hidden">{name}</span>
      </button>
    )
  }
  
  export default NavButton
  