'use client';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { logout } from '@/lib/auth/logout';
import { Avatar } from './UI/avatar';
import { Text } from './UI/text';
import { useAppSelector } from '@/lib/store/hooks';
import { useDispatch } from 'react-redux';
import { resetActiveEntry } from '@/lib/store/slices/entry-slice';
import { resetActivePool } from '@/lib/store/slices/pool-slice';
import { resetAuthState } from '@/lib/store/slices/auth-slice';

type User = {
    id: string;
    username: string;
    avatar: string;
    team: string;
    email: string;
};

type NavigationItem = {
    name: string;
    href: string;
    current: boolean;
};

const navigation: NavigationItem[] = [
    { name: 'Dashboard', href: '#', current: true },
];

export default function Navigation() {
    const selector = useAppSelector((state) => state.authReducer.data);
    const dispatch = useDispatch();

    const user: User = {
        id: selector.id,
        username: selector.username,
        avatar: selector.avatar,
        team: selector.team,
        email: selector.email,
    };

    function getInitials(username: string) {
        return username.substring(0, 2).toLowerCase();
    }

    const initials = getInitials(user.username);

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ');
    }

    // avatar navigation
    const userNavigation = [
        {
            name: 'Sign out',
            onClick: handleClick,
        },
    ];

    function handleClick() {
        // add remove auth state from redux store before logout
        dispatch(resetActivePool([]));
        dispatch(resetActiveEntry());
        dispatch(resetAuthState());
        logout();
    }

    return (
        <div className="min-h-full">
            <div className="dark:bg-gray-800 bg-gray-100 pb-32">
                <Disclosure as="nav" className="dark:bg-gray-800 bg-gray-100">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                <div className="border-b border-gray-700">
                                    <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <Avatar className="size-12 bg-gray-900" src={"/group2.png"}/>
                                           
                                            </div>
                                            <div className="hidden md:block">
                                                <div className="ml-10 flex items-baseline space-x-4">
                                                    {navigation.map((item) => (
                                                        <a
                                                            key={item.name}
                                                            href={item.href}
                                                            className={classNames(
                                                                item.current
                                                                    ? ' bg-white text-black border border-gray-600 hover:bg-gray-600 hover:text-white dark:bg-gray-900 dark:text-white'
                                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                                'rounded-md px-3 py-2 text-sm font-medium'
                                                            )}
                                                            aria-current={
                                                                item.current
                                                                    ? 'page'
                                                                    : undefined
                                                            }
                                                        >
                                                            {item.name}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="ml-4 flex items-center md:ml-6">
                                                <button
                                                    type="button"
                                                    className="relative ml-auto border border-gray-600 dark:border-gray-400 dark:text-gray-400 flex-shrink-0 rounded-full bg-white dark:bg-gray-900 hover:bg-gray-600 hover:text-white p-1 text-gray-600 focus:outline-none  focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                                >
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">
                                                        View notifications
                                                    </span>
                                                    <BellIcon
                                                        className="h-6 w-6"
                                                        aria-hidden="true"
                                                    />
                                                </button>

                                                {/* Profile dropdown */}
                                                <Menu
                                                    as="div"
                                                    className="relative ml-3"
                                                >
                                                    <div>
                                                        <Menu.Button className="relative border border-gray-600 dark:text-white dark:bg-gray-900 hover:bg-gray-600 hover:text-white flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800">
                                                            <span className="absolute -inset-1.5" />
                                                            <span className="sr-only">
                                                                Open user menu
                                                            </span>
                                                            <Avatar
                                                                initials={
                                                                    initials
                                                                }
                                                                className="size-10 rounded-full"
                                                                // src={
                                                                //     user.imageUrl
                                                                // }
                                                                alt=""
                                                            />
                                                        </Menu.Button>
                                                    </div>
                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95"
                                                    >
                                                        <Menu.Items className="border border-gray-700 m-2 text-xs p-2 space-y-1 absolute flex flex-col items-start right-0 z-10 mt-2 w-56 origin-top-right rounded-md dark:bg-gray-800 bg-white dark:text-gray-300  py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                            <div className="border border-gray-700 m-2 text-xs w-48 rounded-xl p-2 space-y-1 bg-gray-100 dark:bg-gray-900">
                                                                <Text>
                                                                    {
                                                                        user.username
                                                                    }
                                                                </Text>
                                                                <div className="pb-2">
                                                                    {user.email}
                                                                </div>
                                                                <hr className=" pb-2 border[0.5px] border-gray-800" />
                                                                <div className="flex">
                                                                    {user.team ===
                                                                    'Liverpool' ? (
                                                                        <>
                                                                            <Avatar
                                                                                className="size-8"
                                                                                src={
                                                                                    '/liverpool_small.png'
                                                                                }
                                                                            />
                                                                            <p className="pl-1 pt-2">
                                                                                Liverpool
                                                                            </p>
                                                                        </>
                                                                    ) : (
                                                                        user.team
                                                                    )}
                                                                </div>

                                                                {/* <div>user.email</div> */}
                                                            </div>
                                                            {userNavigation.map(
                                                                (button) => (
                                                                    <Disclosure.Button
                                                                        key={
                                                                            button.name
                                                                        }
                                                                        onClick={
                                                                            button.onClick
                                                                        }
                                                                    >
                                                                        {({
                                                                            active,
                                                                        }) => (
                                                                            <a
                                                                                className={classNames(
                                                                                    active
                                                                                        ? 'dark:hover:bg-gray-700'
                                                                                        : '',
                                                                                    'block px-4 py-2 text-base text-gray-400 hover:text-gray-700 dark:hover:text-white dark:text-gray-300 '
                                                                                )}
                                                                            >
                                                                                {
                                                                                    button.name
                                                                                } 
                                                                            </a>
                                                                        )}
                                                                    </Disclosure.Button>
                                                                )
                                                            )}
                                                        </Menu.Items>
                                                    </Transition>
                                                </Menu>
                                            </div>
                                        </div>
                                        <div className="-mr-2 flex md:hidden">
                                            {/* Mobile menu button */}
                                            <Disclosure.Button className="relative inline-flex items-center border border-black justify-center rounded-md bg-white dark:bg-gray-900 p-2 text-gray-600 hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-offset-gray-00">
                                                <span className="absolute -inset-0.5" />
                                                <span className="sr-only">
                                                    Open main menu
                                                </span>
                                                {open ? (
                                                    <XMarkIcon
                                                        className="block h-6 w-6"
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <Bars3Icon
                                                        className="block h-6 w-6"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                            </Disclosure.Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                                <div className="space-y-1 px-2 py-3 sm:px-3">
                                    {navigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className={classNames(
                                                item.current
                                                    ? 'dark:bg-gray-900 bg-white dark:border-gray-600 text-black dark:text-white border border-black hover:bg-gray-600 hover:text-white'
                                                    : 'text-gray-300 hover:bg-gray-600 hover:text-white',
                                                'block rounded-md px-3 py-2 text-base font-medium'
                                            )}
                                            aria-current={
                                                item.current
                                                    ? 'page'
                                                    : undefined
                                            }
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                                <div className="border-t pb-3 pt-4">
                                    <div className="flex items-center px-5">
                                        <div className="flex-shrink-0 ">
                                            <Avatar
                                                initials={initials}
                                                className="size-10 rounded-full  dark:bg-gray-900 dark:text-white bg-white border border-gray-800"
                                                // src={
                                                //     user.imageUrl
                                                // }
                                                alt=""
                                            />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base pb-1 font-medium leading-none dark:text-white text-gray-800">
                                                {user.username}
                                            </div>
                                            <div className="text-sm font-medium leading-none text-gray-400">
                                                {user.email}
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="relative ml-auto border border-gray-600 dark:border-gray-400 dark:text-gray-400 flex-shrink-0 rounded-full bg-white dark:bg-gray-900 hover:bg-gray-600 hover:text-white p-1 text-gray-600 focus:outline-none focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        >
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">
                                                View notifications
                                            </span>
                                            <BellIcon
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                    <div className="mt-3 space-y-1 px-2">
                                        {userNavigation.map((item) => (
                                            <Disclosure.Button
                                                key={item.name}
                                                className="block rounded-md px-3 py-2 dark:hover:text-white text-base text-gray-400 hover:text-gray-700"
                                            >
                                                {item.name}
                                            </Disclosure.Button>
                                        ))}
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <header className="py-10">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-white">
                                Your Dashboard
                            </h1>
                            <p className="px-3">🚀</p>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    );
}
