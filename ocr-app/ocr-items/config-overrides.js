// file for all webpack overrides, using react-app-rewired

module.exports = {
    webpack: (config, env) => {
        config.module.rules.push({
            test: /\.worker\.js$/,
            use: {
                loader: 'worker-loader'
            }
        })
        config.output.globalObject = 'this'
        return config;
    },
    jest: (config) => config,
    devServer: (configFunction) => (proxy, allowedHost) => {
        const config = configFunction(proxy, allowedHost);
        config.headers = {
            ...config.headers,
            'X-Frame-Options': 'SAMEORIGIN',
            'X-Content-Type-Options': 'nosniff',
            'X-XSS-Protection': "1; mode=block"
        }
        return config;
    },
    paths: (paths, env) => paths
}