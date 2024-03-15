let SERVER_URL: string = '';

if (process.env.NODE_ENV === 'production') {
    SERVER_URL = `http:${process.env.RAILWAY_PRIVATE_DOMAIN}:${process.env.PORT}/api/graphql`;
} else {
    SERVER_URL = `http://localhost:3000/api/graphql`;
}

export default SERVER_URL;
