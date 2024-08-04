import Image from 'next/image'
import { Disclosure } from '@headlessui/react'
import Toggle from '../Toggle'
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const isDarkMode = theme === 'dark';

  return (
    <div className="w-full h-16">
        <header className="w-full z-10">
            <Disclosure as="nav" className="bg-transparent shadow">
                <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex px-2 lg:px-0 justify-between">
                            <div className="flex flex-shrink-0 items-center">
                                <a className='flex items-center' href="/">
                                    Weather Now
                                    <Image
                                        className="h-10 w-auto ml-2"
                                        src="https://media1.tenor.com/m/NVwxxoyoyGgAAAAd/racoon-pedro.gif"
                                        alt="Weather Now"
                                        height={40}
                                        width={40}
                                    />
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center">
                        <Toggle
                            enabled={isDarkMode}
                            onChange={() => setTheme(isDarkMode ? 'light' : 'dark')}
                            textOn="Dark"
                            textOnClassName="bg-dark/60 text-white"
                            textOff="Light"
                            textOffClassName="bg-light-200 text-white"
                        />
                        </div>
                    </div>
                </div>
            </Disclosure>
        </header>
    </div>
  )
}
