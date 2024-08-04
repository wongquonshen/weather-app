import { Switch } from '@headlessui/react';

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  textOn?: string; // enabled
  textOnClassName?: string;
  textOff?: string; // disbled
  textOffClassName?: string;
}

const Toggle: React.FC<ToggleProps> = ({ enabled, onChange, textOn, textOnClassName, textOff, textOffClassName }) => {
  return (
    <Switch
      checked={enabled}
      onChange={onChange}
      className={`${enabled ? (textOnClassName || 'bg-marine-500') : (textOffClassName || 'bg-gray-200')
        } relative inline-flex items-center justify-start h-8 w-[72px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
    >
      <span
        aria-hidden="true"
        className={`${enabled ? 'translate-x-9' : 'translate-x-0'
          } pointer-events-none absolute z-10 left-1 h-6 w-6 transform rounded-full bg-white shadow ring-0 transition-all duration-200 ease-in-out`}
      />
      {textOff && (
        <span
          className={`absolute right-2 text-xs transition-opacity duration-200 ease-in-out ${enabled ? 'opacity-0' : 'opacity-100'} ${textOffClassName || ''}`}>
          {textOff}
        </span>
      )}
      {textOn && (
        <span
          className={`absolute left-2 text-xs transition-opacity duration-200 ease-in-out ${enabled ? 'opacity-100' : 'opacity-0'} ${textOnClassName || ''}`}>
          {textOn}
        </span>
      )}
    </Switch>
  );
};

export default Toggle;
