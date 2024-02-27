import SignUpForm from '../../components/SignUpForm';
import { registerNewUser } from './actions';

export default async function Page() {

    return (
        <div className="flex h-screen">
            <SignUpForm registerNewUser={registerNewUser} />
        </div>
    );
}
