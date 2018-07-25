import {createContainer} from '@/util'
import Component from './Component'

export default createContainer(Component, (state, ownProps) => {
    return {}
}, () => {

    return {
        async getSocialEvents() {
            let socialEvents = [];
            let socialEvent1 = {
                id: 1,
                name: "Melbourne Meetup",
                date: new Date(2018, 8, 24, 10, 0, 0, 0),
                location: ["Australia", "Melbourne"],
                image: "https://www.whitecase.com/sites/whitecase/files/images/locations/melbourne_thumbnailmobileimage_720x500.jpg",
                hostedBy: "Clarence",
                hashTags: ["#melbourne", "#meetup"],
                going: true
            };
            socialEvents.push(socialEvent1);

            let socialEvent2 = {
                id: 2,
                name: "Melbourne Meetup",
                date: new Date(2018, 8, 24, 10, 0, 0, 0),
                location: ["Australia", "Melbourne"],
                image: "https://www.whitecase.com/sites/whitecase/files/images/locations/melbourne_thumbnailmobileimage_720x500.jpg",
                hostedBy: "Clarence",
                hashTags: ["#melbourne", "#meetup"],
                going: true
            };
            socialEvents.push(socialEvent2);

            let socialEvent3 = {
                id: 3,
                name: "Melbourne Meetup",
                date: new Date(2018, 8, 24, 10, 0, 0, 0),
                location: ["Australia", "Melbourne"],
                image: "https://www.whitecase.com/sites/whitecase/files/images/locations/melbourne_thumbnailmobileimage_720x500.jpg",
                hostedBy: "Clarence",
                hashTags: ["#melbourne", "#meetup"],
                going: false
            };
            socialEvents.push(socialEvent3);

            return socialEvents;
        },

        async getCommunityTree() {
            let communityTree = {
                europe: ["Germany", "Austria"],
                usa: ["New York"],
                australia: ["Melbourne"]
            };
            return communityTree;
        }
    }
})
