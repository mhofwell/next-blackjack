let SERVER_URL: string = '';

if (process.env.NODE_ENV === 'production') {
    SERVER_URL = `http://${process.env.RAILWAY_PRIVATE_DOMAIN}:${process.env.PORT}/api/graphql`;
    // SERVER_URL = `http://${process.env.RAILWAY_PRIVATE_DOMAIN}:3000/api/graphql`;
    // SERVER_URL = `http://localhost:3000/api/graphql`;
} else {
    SERVER_URL = `http://localhost:3000/api/graphql`;
    // SERVER_URL = process.env.SERVER_URL!;
}

export default SERVER_URL;
