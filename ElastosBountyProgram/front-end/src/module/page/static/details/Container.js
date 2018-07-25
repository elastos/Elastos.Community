import {createContainer} from '@/util'
import Component from './Component'

export default createContainer(Component, (state, ownProps) => {
    return {}
}, () => {

    const loadSocialEvent = () => {
        let socialEvent = {
            id: 1,
            name: "Melbourne Meetup",
            type: "Regular Meetup",
            date: "Sun, 1 July 10:00am",
            location: "Melbourne, Australia",
            language: "English",
            image: "https://www.whitecase.com/sites/whitecase/files/images/locations/melbourne_thumbnailmobileimage_720x500.jpg",
            hostedBy: "Clarence",
            hashTags: ["#melbourne", "#meetup"],
            going: true
        };
        return socialEvent
    };

    return {
        async getSocialEvent() {
            return loadSocialEvent()
        }
    }
})
