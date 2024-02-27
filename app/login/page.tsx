import LoginForm from '../../components/LoginForm';
import { logUserIn } from './actions';

export default async function Page() {
    return (
        <div className="flex h-screen">
            <LoginForm logUserIn={logUserIn} />
        </div>
    );
}
