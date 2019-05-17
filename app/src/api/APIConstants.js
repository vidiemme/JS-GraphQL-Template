"use strict";

const { merge } = require('lodash');
const { mergeTypes } = require('merge-graphql-schemas');

const CustomTypes = require('./Utils/CustomTypes');
const ActorsAPI = require('./Actor/Actor');
const LandingAPI = require('./Landing/Landing');

module.exports = {
    
    prepareForTest: function() {
        ActorsAPI.setDataProvider(require('./Actor/MockActorDataProvider'));
    },

    buildResolvers: function(args) {
        //Entry point for adding APIs
        let result = merge(
            CustomTypes.resolvers,
            ActorsAPI.resolvers,
            LandingAPI.resolvers
        );
        return result;
    },

    buildSchema: function() {
        let schema = mergeTypes([
            CustomTypes.buildSchema(),
            ActorsAPI.buildSchema(),
            LandingAPI.buildSchema()
        ]);
        return schema;
    }
};