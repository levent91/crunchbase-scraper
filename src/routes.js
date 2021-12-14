/* eslint no-eval:0 */
/* eslint max-len:0 */
// routes.js
const Apify = require('apify');
const _ = require('lodash');
const tools = require('./tools');

const INVESTOR_TYPES = {
    investment_bank: 'Investment Bank',
    fund_of_funds: 'Fund Of Funds',
    micro_vc: 'Micro VC',
    incubator: 'Incubator',
    hedge_fund: 'Hedge Fund',
    secondary_purchaser: 'Secondary Purchaser',
    government_office: 'Government Office',
    accelerator: 'Accelerator',
    co_working_space: 'Co-Working Space',
    startup_competition: 'Startup Competition',
    private_equity_firm: 'Private Equity Firm',
    venture_debt: 'Venture Debt',
    family_investment_office: 'Family Investment Office',
    pension_funds: 'Pension Funds',
    venture_capital: 'Venture Capital',
    syndicate: 'Syndicate',
    angel_group: 'Angel Group',
    university_program: 'University Program',
    corporate_venture_capital: 'Corporate Venture Capital',
    entrepreneurship_program: 'Entrepreneurship Program',
};

const {
    utils: { log },
} = Apify;

exports.LIST = async ({ data, request }, { requestQueue }) => {
    const { startRank, endRank } = request.userData;

    log.info(`CRAWLER: -- Checking VCs for rank: ${startRank}-${endRank}`);

    // Get location
    const json = JSON.parse(data);
    const { count, entities } = json;

    // Fetch detail
    for (const entity of entities) {
        await requestQueue.addRequest({
            url: `https://www.crunchbase.com/v4/data/entities/organizations/${entity.properties.identifier.permalink}?field_ids=%5B%22identifier%22,%22layout_id%22,%22facet_ids%22,%22title%22,%22short_description%22,%22is_locked%22%5D&layout_mode=view_v2`,
            userData: {
                label: 'ORGANIZATION',
                entity: entity.properties,
            },
        });
    }

    // Iterate forward
    if (count > 15) {
        const pages = tools.splitRank(startRank, endRank);

        for (const page of pages) {
            await requestQueue.addRequest(page, { forefront: true });
        }
    }

    log.debug(`CRAWLER: -- Checked VCs with type: ${investorType} for rank: ${startRank}-${endRank}`);
};

exports.ORGANIZATION = async ({ data, request }, { requestQueue }) => {
    const { entity } = request.userData;
    const logValue = entity.identifier.value;
    log.info(`PHASE: -- Fetching organization: ${logValue}`);

    const { properties, cards } = JSON.parse(data);
    const participatedRounds = cards.investments_list && cards.investments_list.map(investment => (investment.funding_round_identifier && investment.funding_round_identifier.value)).filter(name => name);

    const output = {
        org_type: cards.investor_about_fields2 ? cards.investor_about_fields2.investor_type.map(type => INVESTOR_TYPES[type]) : [],
        name: properties.title,
        hq_city: cards.investor_about_fields2
            && cards.investor_about_fields2.location_identifiers
            && cards.investor_about_fields2.location_identifiers.find(location => location.location_type === 'city')
            && cards.investor_about_fields2.location_identifiers.find(location => location.location_type === 'city').value,
        hq_country: cards.investor_about_fields2
            && cards.investor_about_fields2.location_identifiers
            && cards.investor_about_fields2.location_identifiers.find(location => location.location_type === 'country')
            && cards.investor_about_fields2.location_identifiers.find(location => location.location_type === 'country').value,
        logo: `https://res.cloudinary.com/crunchbase-production/image/upload/${properties.identifier.image_id}`,
        thesis: properties.short_description,
        round: _.uniq(participatedRounds.map(round => round.split('-')[0].trim())),
        founding_year: cards.overview_fields_extended
        && cards.overview_fields_extended.founded_on
        && cards.overview_fields_extended.founded_on.value
        && cards.overview_fields_extended.founded_on.value.slice(0, 4),
        number_of_funds: cards.investor_overview_highlights && cards.investor_overview_highlights.num_funds,
        number_of_investments: cards.investor_overview_highlights && cards.investor_overview_highlights.num_investments,
        number_of_exits: cards.investor_overview_highlights && cards.investor_overview_highlights.num_exits,
        number_of_investments_lead: cards.investments_headline && cards.investments_headline.num_lead_investments,
        url_homepage: cards.investor_about_fields2
        && cards.investor_about_fields2.website
        && cards.investor_about_fields2.website.value,
        url_twitter: cards.social_fields
        && cards.social_fields.twitter
        && cards.social_fields.twitter.value,
        url_linkedin: cards.social_fields
        && cards.social_fields.linkedin
        && cards.social_fields.linkedin.value,
        url_facebook: cards.social_fields
        && cards.social_fields.facebook
        && cards.social_fields.facebook.value,
        url_source: `https://www.crunchbase.com/organization/${properties.identifier.permalink}`,
        total_funding_rised: cards.funds_summary.funds_total ? `${cards.funds_summary.funds_total.value} ${cards.funds_summary.funds_total.currency}` : '',
        transactions: cards.investments_list && cards.investments_list.map(investment => ({
            name: investment.organization_identifier.value,
            ticket_size: investment.funding_round_money_raised ? `${investment.funding_round_money_raised.value} ${investment.funding_round_money_raised.currency}` : '',
            round_type: investment.funding_round_identifier.value.split('-')[0].trim(),
            transaction_date: investment.announced_on,
            lead_investor: investment.is_lead_investor,
            url_source: `https://www.crunchbase.com/organization/${investment.organization_identifier}`,
        })),
    };


    const companies = (cards.investments_list || []).map(investment => ({
        name: investment.organization_identifier.value,
        permalink: investment.organization_identifier.permalink,
    }));


    for (const company of companies) {
        await requestQueue.addRequest({
            url: `https://www.crunchbase.com/v4/data/entities/organizations/${company.permalink}?field_ids=%5B%22identifier%22,%22layout_id%22,%22facet_ids%22,%22title%22,%22short_description%22,%22is_locked%22%5D&layout_mode=view_v2`,
            userData: {
                label: 'COMPANY',
                company,
            },
        });
    }

    await Apify.pushData(output);

    log.debug(`CRAWLER -- Fetched organization: ${logValue}`);
};

exports.COMPANY = async ({ data, request }, { companyDataset }) => {
    const { company } = request.userData;
    log.info(`PHASE: -- Fetching company: ${company.name}`);


    const companyJSON = JSON.parse(data);

    const output = {
        name: companyJSON.properties.title,
        logo: `https://res.cloudinary.com/crunchbase-production/image/upload/${companyJSON.properties.identifier.image_id}`,
        url_source: `https://www.crunchbase.com/organization/${companyJSON.properties.identifier.permalink}`,
        url_homepage: companyJSON.cards.company_about_fields2 && companyJSON.cards.company_about_fields2.website ? companyJSON.cards.company_about_fields2.website.value : '',
        country: companyJSON.cards.company_about_fields2
        && companyJSON.cards.company_about_fields2.location_identifiers
        && companyJSON.cards.company_about_fields2.location_identifiers.find(location => location.location_type === 'country')
        && companyJSON.cards.company_about_fields2.location_identifiers.find(location => location.location_type === 'country').value,
        industry: companyJSON.cards.overview_fields_extended && companyJSON.cards.overview_fields_extended.categories && companyJSON.cards.overview_fields_extended.categories.map(category => category.value),
    };


    await companyDataset.pushData(output);

    log.debug(`CRAWLER -- Fetched company: ${company.name}`);
};
