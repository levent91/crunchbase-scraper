/* eslint max-len:0 */

const Apify = require('apify');
const routes = require('./routes');

const {
    utils: { log },
} = Apify;

// Retrieves sources and returns object for request list
exports.getSources = async () => {
    log.debug('Getting sources');

    return [
        {
            url: 'https://www.crunchbase.com/v4/data/searches/principal.investors?source=custom_query_builder',
            userData: {
                label: 'LIST',
                method: 'POST',
                startRank: 1,
                endRank: 10000000,
                investorType: 'venture_capital',
                payload: '{"field_ids":["identifier","num_investments_funding_rounds","num_exits","location_identifiers"],"order":[{"field_id":"num_investments_funding_rounds","sort":"desc"}],"query":[{"type":"predicate","field_id":"investor_type","operator_id":"includes","values":["venture_capital"]},{"type":"predicate","field_id":"rank_principal_investor","operator_id":"between","include_nulls":null,"values":[1,10000000]}],"field_aggregators":[],"collection_id":"principal.investors","limit":15}',
                headers: {
                    accept: 'application/json, text/plain, */*',
                    'accept-language': 'en-US,en;q=0.9,fr-CA;q=0.8,fr;q=0.7,tr;q=0.6,de;q=0.5,de-AT;q=0.4,en-IN;q=0.3,en-GB;q=0.2,en-AU;q=0.1,en-NZ;q=0.1,en-CA;q=0.1,en-ZA;q=0.1,en-GB-oxendict;q=0.1',
                    'content-type': 'application/json',
                    'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin',
                    'x-requested-with': 'XMLHttpRequest',
                },
            },
        }, {
            url: 'https://www.crunchbase.com/v4/data/searches/principal.investors?source=custom_query_builder',
            userData: {
                label: 'LIST',
                method: 'POST',
                startRank: 1,
                endRank: 10000000,
                investorType: 'private_equity_firm',
                payload: '{"field_ids":["identifier","num_investments_funding_rounds","num_exits","location_identifiers"],"order":[{"field_id":"num_investments_funding_rounds","sort":"desc"}],"query":[{"type":"predicate","field_id":"investor_type","operator_id":"includes","values":["private_equity_firm"]},{"type":"predicate","field_id":"rank_principal_investor","operator_id":"between","include_nulls":null,"values":[1,10000000]}],"field_aggregators":[],"collection_id":"principal.investors","limit":15}',
                headers: {
                    accept: 'application/json, text/plain, */*',
                    'accept-language': 'en-US,en;q=0.9,fr-CA;q=0.8,fr;q=0.7,tr;q=0.6,de;q=0.5,de-AT;q=0.4,en-IN;q=0.3,en-GB;q=0.2,en-AU;q=0.1,en-NZ;q=0.1,en-CA;q=0.1,en-ZA;q=0.1,en-GB-oxendict;q=0.1',
                    'content-type': 'application/json',
                    'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin',
                    'x-requested-with': 'XMLHttpRequest',
                },
            },
        }, {
            url: 'https://www.crunchbase.com/v4/data/searches/principal.investors?source=custom_query_builder',
            userData: {
                label: 'LIST',
                method: 'POST',
                startRank: 1,
                endRank: 10000000,
                investorType: 'corporate_venture_capital',
                payload: '{"field_ids":["identifier","num_investments_funding_rounds","num_exits","location_identifiers"],"order":[{"field_id":"num_investments_funding_rounds","sort":"desc"}],"query":[{"type":"predicate","field_id":"investor_type","operator_id":"includes","values":["corporate_venture_capital"]},{"type":"predicate","field_id":"rank_principal_investor","operator_id":"between","include_nulls":null,"values":[1,10000000]}],"field_aggregators":[],"collection_id":"principal.investors","limit":15}',
                headers: {
                    accept: 'application/json, text/plain, */*',
                    'accept-language': 'en-US,en;q=0.9,fr-CA;q=0.8,fr;q=0.7,tr;q=0.6,de;q=0.5,de-AT;q=0.4,en-IN;q=0.3,en-GB;q=0.2,en-AU;q=0.1,en-NZ;q=0.1,en-CA;q=0.1,en-ZA;q=0.1,en-GB-oxendict;q=0.1',
                    'content-type': 'application/json',
                    'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin',
                    'x-requested-with': 'XMLHttpRequest',
                },
            },
        },
        {
            url: 'https://www.crunchbase.com/v4/data/searches/principal.investors?source=custom_query_builder',
            userData: {
                label: 'LIST',
                method: 'POST',
                startRank: 1,
                endRank: 10000000,
                investorType: 'micro_vc',
                payload: '{"field_ids":["identifier","num_investments_funding_rounds","num_exits","location_identifiers"],"order":[{"field_id":"num_investments_funding_rounds","sort":"desc"}],"query":[{"type":"predicate","field_id":"investor_type","operator_id":"includes","values":["micro_vc"]},{"type":"predicate","field_id":"rank_principal_investor","operator_id":"between","include_nulls":null,"values":[1,10000000]}],"field_aggregators":[],"collection_id":"principal.investors","limit":15}',
                headers: {
                    accept: 'application/json, text/plain, */*',
                    'accept-language': 'en-US,en;q=0.9,fr-CA;q=0.8,fr;q=0.7,tr;q=0.6,de;q=0.5,de-AT;q=0.4,en-IN;q=0.3,en-GB;q=0.2,en-AU;q=0.1,en-NZ;q=0.1,en-CA;q=0.1,en-ZA;q=0.1,en-GB-oxendict;q=0.1',
                    'content-type': 'application/json',
                    'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin',
                    'x-requested-with': 'XMLHttpRequest',
                },
            },
        }];
};

// Create router
exports.createRouter = (globalContext) => {
    return async function (routeName, requestContext) {
        const route = routes[routeName];
        if (!route) throw new Error(`No route for name: ${routeName}`);
        log.debug(`Invoking route: ${routeName}`);
        return route(requestContext, globalContext);
    };
};

exports.splitRank = (startRank = 1, endRank = 10000000, investorType) => {
    function splitNumbers(min, max) {
        // Don't forget that max can be null and we have to handle that situation
        if (max && min > max) {
            max = min;
        }

        // We crate a middle value for the split. If max in null, we will use double min as the middle value
        const middle = max
            ? min + Math.floor((max - min) / 2)
            : min * 2;

        // We have to do the Math.max and Math.min to prevent having min > max
        const filterMin = {
            min,
            max: Math.max(middle, min),
        };
        const filterMax = {
            min: max ? Math.min(middle + 1, max) : middle + 1,
            max,
        };
        // We return 2 new filters
        return [filterMin, filterMax];
    }

    const ranges = splitNumbers(startRank, endRank);

    return ranges.map(range => ({
        url: 'https://www.crunchbase.com/v4/data/searches/principal.investors?source=custom_query_builder',
        uniqueKey: `LIST-${range.min}-${range.max}`,
        userData: {
            label: 'LIST',
            startRank: range.min,
            endRank: range.max,
            method: 'POST',
            investorType,
            payload: `{"field_ids":["identifier","num_investments_funding_rounds","num_exits","location_identifiers"],"order":[{"field_id":"num_investments_funding_rounds","sort":"desc"}],"query":[{"type":"predicate","field_id":"investor_type","operator_id":"includes","values":["${investorType}"]},{"type":"predicate","field_id":"rank_principal_investor","operator_id":"between","include_nulls":null,"values":[${range.min},${range.max}]}],"field_aggregators":[],"collection_id":"principal.investors","limit":15}`,
            headers: {
                accept: 'application/json, text/plain, */*',
                'accept-language': 'en-US,en;q=0.9,fr-CA;q=0.8,fr;q=0.7,tr;q=0.6,de;q=0.5,de-AT;q=0.4,en-IN;q=0.3,en-GB;q=0.2,en-AU;q=0.1,en-NZ;q=0.1,en-CA;q=0.1,en-ZA;q=0.1,en-GB-oxendict;q=0.1',
                'content-type': 'application/json',
                'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
                'sec-ch-ua-mobile': '?0',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'x-requested-with': 'XMLHttpRequest',
            },
        },
    }));
};
