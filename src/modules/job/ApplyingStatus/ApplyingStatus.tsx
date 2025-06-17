
interface ApplyingStatusProps {
  text?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const ApplyingStatus: React.FC<ApplyingStatusProps> = ({ 
  text = "Aplicando...", 
  size = "md",
  className = "" 
}) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  const dotSizes = {
    sm: "w-1 h-1",
    md: "w-1.5 h-1.5", 
    lg: "w-2 h-2"
  };

  return (
    <div className={`flex items-center justify-center space-x-3 ${className}`}>
      {/* Spinner circular */}
      <div className="relative">
        <div className="w-6 h-6 border-2 border-gray-300 rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-6 h-6 border-2 border-transparent border-t-gray-700 rounded-full"></div>
        </div>
      </div>
      
      {/* Texto con puntos animados */}
      <div className="flex items-center space-x-1">
        <span className={`${sizeClasses[size]} text-gray-700 font-medium`}>
          {text}
        </span>
        <div className="flex space-x-1">
          <div className={`${dotSizes[size]} bg-gray-600 rounded-full animate-pulse`} 
               style={{ animationDelay: '0ms', animationDuration: '1.4s' }}></div>
          <div className={`${dotSizes[size]} bg-gray-600 rounded-full animate-pulse`} 
               style={{ animationDelay: '200ms', animationDuration: '1.4s' }}></div>
          <div className={`${dotSizes[size]} bg-gray-600 rounded-full animate-pulse`} 
               style={{ animationDelay: '400ms', animationDuration: '1.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default ApplyingStatus;
