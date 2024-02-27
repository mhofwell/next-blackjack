import Spinner from './UI/spinner';

type Loading = {
    loading: boolean;
    text: string;
};

export default function AnimatedButton(state: Loading) {
    let buttonCopy: string; // This is the text that will be displayed on the button.
    state.loading === true
        ? (buttonCopy = 'Loading...')
        : (buttonCopy = state.text);

    return (
        <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            {state.loading === true ? <Spinner /> : null}
            {buttonCopy}
        </button>
    );
}
