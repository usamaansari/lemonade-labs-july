'use client';

const OnboardingProgress = ({ steps, currentStep }) => {
  return (
    <nav aria-label="Progress">
      <ol className="flex items-center">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isUpcoming = step.id > currentStep;

          return (
            <li
              key={step.id}
              className={`flex-1 ${index !== steps.length - 1 ? 'pr-4 sm:pr-8' : ''}`}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isCurrent
                      ? 'bg-amber-600 text-white border-2 border-amber-600'
                      : 'bg-white border-2 border-gray-300 text-gray-500'
                  }`}
                >
                  {isCompleted ? (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <span className="font-medium">{step.id}</span>
                  )}
                </div>
                <span
                  className={`mt-2 text-sm font-medium text-center ${
                    isCurrent ? 'text-amber-700' : 'text-gray-500'
                  }`}
                >
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="absolute top-5 right-0 h-0.5 w-full -z-10">
                  <div
                    className={`h-full ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default OnboardingProgress;
