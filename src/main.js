const Apify = require('apify');
const httpRequest = require('@apify/http-request');
const cheerio = require('cheerio');
const moment = require('moment');
const tools = require('./tools');

const {
    utils: { log },
} = Apify;

// Create crawler
Apify.main(async () => {
    log.info('PHASE -- STARTING ACTOR..');

    // Create request queue
    const requestQueue = await Apify.openRequestQueue();

    // Initialize first requests
    const pages = await tools.getSources();
    for (const page of pages) {
        await requestQueue.addRequest({ ...page }, { forefront: true });
    }

    // Proxy configuration
    const proxyConfiguration = await Apify.createProxyConfiguration();

    // Portfolio company dataset
    const companyDataset = await Apify.openDataset(`COMPANY-${moment().format('YYYYMMDDHHss')}`);

    log.info(`Investment Firm dataset: https://api.apify.com/v2/datasets/${Apify.getEnv().defaultDatasetId}/items?clean=true`);
    log.info(`Company dataset: https://api.apify.com/v2/datasets/${companyDataset.id}/items?clean=true`);

    // Create route
    const router = tools.createRouter({ requestQueue, proxyConfiguration, companyDataset });

    log.info('PHASE -- SETTING UP CRAWLER.');
    const crawler = new Apify.BasicCrawler({
        requestQueue,
        maxConcurrency: 50,
        handleRequestTimeoutSecs: 120,
        useSessionPool: true,
        handleRequestFunction: async (context) => {
            const { request, session } = context;
            const { method, headers, payload } = request.userData;
            log.debug(`CRAWLER -- Processing ${request.url}`);

            // Send request
            const response = await httpRequest({
                url: request.url,
                method: method || 'GET',
                timeoutSecs: 120,
                proxyUrl: proxyConfiguration.newUrl(session.id),
                ...(headers ? { headers } : {}),
                ...(payload ? { payload } : {}),
            });

            if (!response || response.statusCode !== 200) {
                session.retire();
                throw 'request denied'
            }

            // Add to context
            const data = response.body;
            context.data = data;
            context.$ = cheerio.load(data);

            // Redirect to route
            await router(request.userData.label, context);
        },
    });

    log.info('CRAWLER STARTED.');

    await crawler.run();

    log.info('ACTOR FINISHED.');
});
