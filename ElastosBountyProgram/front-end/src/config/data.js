export default {
    listCountries: [
        {
            name: 'Vietnam',
            code: 'vn',
        },
        {
            name: 'China',
            code: 'cn',
        },
        {
            name: 'USA',
            code: 'us',
        },
    ],
    mockDataAllLeaders: [
        {
            id: 1,
            name: 'Nguyen Van A',
            country: 'Vietnam',
            countryCode: 'vn',
            avatar: 'https://www.w3schools.com/howto/img_avatar.png',
        },
        {
            id: 2,
            name: 'John',
            country: 'Vietnam',
            countryCode: 'vn',
            avatar: 'https://www.w3schools.com/howto/img_avatar.png',
        },
        {
            id: 3,
            name: 'John Even',
            country: 'China',
            countryCode: 'cn',
            avatar: 'https://www.w3schools.com/howto/img_avatar.png',
        },
        {
            id: 4,
            name: 'Obama',
            country: 'USA',
            countryCode: 'us',
            avatar: 'https://www.w3schools.com/howto/img_avatar.png',
        }
    ],
    mockDataLeaderByCountries: {
        vn: [
            {
                id: 1,
                name: 'Nguyen Van A',
                country: 'Vietnam',
                countryCode: 'vn',
                avatar: 'https://www.w3schools.com/howto/img_avatar.png',
            },
            {
                id: 2,
                name: 'John',
                country: 'Vietnam',
                countryCode: 'vn',
                avatar: 'https://www.w3schools.com/howto/img_avatar.png',
            },
        ],
        cn: [
            {
                id: 3,
                name: 'John Even',
                country: 'China',
                countryCode: 'cn',
                avatar: 'https://www.w3schools.com/howto/img_avatar.png',
            }
        ],
        us: [
            {
                id: 4,
                name: 'Obama',
                country: 'USA',
                countryCode: 'us',
                avatar: 'https://www.w3schools.com/howto/img_avatar.png',
            }
        ]
    }
}