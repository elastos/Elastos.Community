import React from 'react'
import StandardPage from '../../StandardPage'
import Footer from '@/module/layout/Footer/Container'
import './style.scss'

import { Col, Row } from 'antd'
import moment from 'moment/moment'

export default class extends StandardPage {

    ord_renderContent () {
        return (
            <div className="p_Privacy">
                <div className="ebp-header-divider">

                </div>

                <div className="ebp-page-title">
                    <Row className="d_row d_rowGrey">
                        <h3 className="page-header">
                            Privacy Policy
                        </h3>
                    </Row>
                </div>
                <div className="ebp-page">
                    <Row className="d_row">
                        <p>
                            This Privacy policy describes how Elastos Foundation Ltd. collects, uses, and shares personal information.
                        </p>
                        <h3>
                            <u>Types Of Data We Collect.</u>
                        </h3>
                        <p>
                            Personal information means information that allows someone to identify or contact you.  Non-personal information means information that does not directly identify you.  We collect both types of information about you.
                        </p>
                        <p>
                            The following provides examples of the types of data that we collect from you and how we use the information.
                        </p>

                        <table className="typesOfData">
                            <thead>
                            <tr>
                                <th>
                                    Context
                                </th>
                                <th>
                                    Types of Data and Purpose for Collection
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    Account Registration
                                </td>
                                <td>
                                    We may collect your name and contact information when you create an account.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Demographic Information
                                </td>
                                <td>
                                    We may collect personal information from you, such as your age or location.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Email Interconnectivity
                                </td>
                                <td>
                                    If you receive email from us, we may use certain tools to capture data related to when you open our message or click on any links or banners it contains.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Employment
                                </td>
                                <td>
                                    If you apply for a job posting, or become an employee, we may collect personal information necessary to process your application.  This may include, among other things, your Social Security Number.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Feedback/Support
                                </td>
                                <td>
                                    If you provide us feedback or contact us for support we will collect your name and e-mail address and possibly other personal information, as well as any other content that you send to us in order to reply.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Mailing List
                                </td>
                                <td>
                                    When you sign up for one of our mailing lists we may collect your email address or postal address.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Online Forms and Submissions
                                </td>
                                <td>
                                    We collect information you submit to us on our websites or through online forms to process your requests.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Order Placement
                                </td>
                                <td>
                                    We may collect your name, billing address, shipping address, e-mail address, and phone number when you place an order.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Surveys
                                </td>
                                <td>
                                    When you participate in a survey we may collect additional information that you provide through the survey.  If the survey is provided by a third party service provider, the third party’s privacy policy applies to the collection, use, and disclosure of your information. Unless expressly indicated on the face of the survey we do not use survey information to market products or services to survey participants. If you are provided a separate privacy policy on part of a survey or study, the terms of that policy shall govern your information.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Third Party Tracking
                                </td>
                                <td>
                                    Some of our websites may participate in behavior-based advertising.  This means that a third party may be allowed to use technology (e.g., a cookie) to collect information about your use of our website so that they can provide advertising about products and services tailored to your interests.  If occurring, that advertising may appear either on our websites, or on other websites.  You can opt-out of receiving advertising based upon your browsing behavior from some network advertising companies by going to the Network Advertising Initiative and the Digital Advertising Alliance websites, although to completely prevent advertising based upon your browsing behavior you should also disable the cookies on your browser.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Web logs
                                </td>
                                <td>
                                    We may collect information from you, including your browser type, operating system, Internet Protocol (IP) address (a number that is automatically assigned to your computer when you use the Internet), domain name, click-activity, referring website, and/or a date/time stamp for your visit. Web logs may be used for things like monitoring website usage levels and diagnosing problems.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Device Information
                                </td>
                                <td>
                                    We may collect information about the device accessing the website such as MAC address, device type, and device identifiers.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Cookies
                                </td>
                                <td>
                                    We may use cookies and clear GIFs. “Cookies” are small pieces of information that a website sends to your device while you are viewing a website. We may use both session cookies (which expire once you close your web browser) and persistent cookies (which stay on your device until you delete them).  Among other things, cookies allow us to provide you with a more personal and interactive experience and to improve our marketing efforts. Persistent cookies may be removed by following instructions provided by your browser.  If you choose to disable cookies some areas or features of our websites may not work properly.
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <br/>
                        <br/>
                        <p>
                            In addition to the information that we collect from you directly, we may also receive information about you from other sources, including third parties, business partners, our affiliates, or publicly available sources.
                        </p>

                        <h3>Use And Processing Of Your Personal Information.</h3>

                        <p>
                            In addition to the uses described above, we may use your personal information, sometimes combined with non-personal information, in the following ways:
                        </p>

                        <ul>
                            <li>To identify you when you visit our websites.</li>
                            <li>To provide the products, information, and services you request.</li>
                            <li>To improve and personalize your experience with us.</li>
                            <li>For order processing and to streamline your checkout process.</li>
                            <li>To conduct analytics and solve problems.</li>
                            <li>To respond to your inquiries related to support, employment, or other requests.</li>
                            <li>To send marketing and promotional materials, including information relating to our products, services, sales, newsletters, tips, or promotions.</li>
                            <li>In some instances, to provide you with advertisements.</li>
                            <li>For internal administrative purposes, as well as to manage our relationship with you.</li>
                            <li>For hiring purposes if you contacted us in connection with a job opportunity.</li>
                        </ul>

                        <h3>Sharing Of Personal Information.</h3>

                        <p>
                            In addition to the specific situations discussed elsewhere in this policy, we disclose personal information in the following situations:
                        </p>

                        <ul>
                            <li><b>Affiliates and Acquisitions.</b> We may share your personal information with our corporate affiliates (e.g., parent company, sister companies, subsidiaries, joint ventures, or other companies under common control).  If another company acquires our company, business, or our assets, we will also share your personal information with that company.</li>
                            <li><b>Other Disclosures with Your Consent.</b> We may ask if you would like us to share your information with other unaffiliated third parties who are not described elsewhere in this policy.</li>
                            <li><b>Other Disclosures without Your Consent.</b> We may disclose personal information in response to subpoenas, warrants, or court orders, in connection with any legal or regulatory process, or to comply with relevant laws.  We may also share your personal information in order to establish or exercise our rights, to defend against a legal claim, to investigate, prevent, or take action regarding possible illegal activities, suspected fraud, safety of person or property, for audit purposes, or a violation of our policies.</li>
                            <li><b>Service Providers.</b> We may share your personal information with service providers.  Among other things service providers may help us to administer our website, conduct surveys, mail communications, and provide technical support. These service providers may collect, store, analyze, or otherwise process information on our behalf.</li>
                            <li><b>Advertising and Marketing.</b> We may use any statements that you communicate to us through the website regarding the Cyber Republic or Elastos or any of our products and services for advertising or marketing purposes.</li>
                        </ul>

                        <h3>Your Choices.</h3>

                        <p>
                            You can make the following choices regarding your personal information:
                        </p>

                        <ul>
                            <li><b>Changes to Your Personal Information.</b> We rely on you to update and correct your personal information.  Some of our websites allow you to modify or delete your account profile. Some personal information can also be changed by contacting us using the information in the “Contact Information” section below.</li>
                            <li><b>Deletion of Your Personal Information.</b> Typically we retain your personal information for the period necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law.  You may, however, request that we delete your personal information.  All requests must be directed to the contact in the “Contact Information” section below.  We may also decide to delete your data if we believe that the data is incomplete, inaccurate, or that our continued use and storage are contrary to our obligations to other individuals or third parties.  When we delete personal information it will be removed from our active database, but it may remain in archives where it is not practical or possible to delete it. In addition, we may keep your personal information as needed to comply with our legal obligations, resolve disputes, and/or enforce any of our agreements.</li>
                            <li><b>Revocation of Consent.</b>  If you revoke your consent for the processing of personal information then we may no longer be able to provide you certain services. In some cases, we may limit or deny your request to revoke consent if the law permits or requires us to do so, if we are unable to adequately verify your identity, or if our processing is not based on your consent.</li>
                            <li><b>Access to Your Personal information.</b> If required by law, upon request, we will grant reasonable access to personal information that we hold about you. All requests must be directed to the contact in the “Contact Information” section.</li>
                            <li><b>Online Tracking.</b>  We do not currently recognize automated browser signals regarding tracking mechanisms, which may include "Do Not Track" instructions.</li>
                            <li><b>California Residents.</b>  California residents may be entitled to ask us for a notice describing what categories of personal information (if any) we share with third parties or affiliates for those parties to use for direct marketing.  If you are a California resident and would like a copy of such notice, please submit a written request to us using the information in the “Contact Information” section below.</li>
                            <li><b>Decline to Provide.</b> You may chose not to provide some types of personal information to us. This choice may result in our websites or their functionality not working.</li>
                            <li><b>Complaints.</b> Complaints can be sent to us using the “Contact Information” details below. Some jurisdictions may also allow you to complain to a data protection authority as well.</li>
                        </ul>

                        <h3>
                            How We Protect Personal Information.
                        </h3>

                        <p>
                            No method of transmission over the Internet, or method of electronic storage, is fully secure. While we use reasonable efforts to protect your personal information from unauthorized access, use, or disclosure, we cannot guarantee the security of your personal information. In the event that we are required by law to inform you of any unauthorized access to your personal information we may notify you electronically, in writing, or by telephone, if permitted to do so by law.
                        </p>

                        <p>
                            Some of our websites permit you to create an account.  When you do you will be prompted to create a password.  You are responsible for maintaining the confidentiality of your password, and you are responsible for any access to or use of your account by someone else that has obtained your password, whether or not such access or use has been authorized by you.  You should notify us of any unauthorized use of your password or account.
                        </p>

                        <h3>
                            Cookies and Other Web Devices.
                        </h3>

                        <p>
                            Each website can send its own cookie to your web browser if your browser's preferences allow it. Cookie settings can be controlled in your internet browser to automatically reject some forms of cookies. If you view our websites without changing your cookie settings, you are indicating you consent to receive all cookies from the website. If you do not allow cookies, some features and functionality of our site may not operate as expected.
                        </p>

                        <p>
                            Elastos may use Adobe Flash technology (including Flash Local Stored Objects "Flash LSOs") that allow Elastos to, among other things, serve you with more tailored information, facilitate your ongoing access to and use of the site, and collect and store information about your use of the site. Some of our websites or emails also use pixel tags, web beacons, clear GIFs, or other similar technologies to measure the success of marketing campaigns, and compile statistics about usage and response rates, and other purposes.
                        </p>

                        <p>
                            Elastos may use other web devices to track website usage and views. Please address any questions or concerns about our cookie or web device usage to the “Contact Information” contained in this policy.
                        </p>

                        <h3>Miscellaneous. </h3>

                        <p>
                            The following additional information relates to our privacy practices:
                        </p>

                        <ul>
                            <li><b>Minors.</b> Our websites are not for individuals under age 13. Those individuals should not access a website or provide personal information to us.</li>
                            <li><b>Transmission of Data to Other Countries.</b> Your personal information may be processed in other countries (such as the United States), where privacy laws may be less stringent than the laws in your country and where the government, courts, or law enforcement of that country may be able to access it.  By submitting your personal information to us you agree to the transfer, storage and processing of your information in those countries.</li>
                            <li><b>Third Party Applications/Websites.</b>  We have no control over the privacy practices of websites or applications that we do not own.</li>
                            <li><b>Contact Information.</b>  If you have any questions, comments, or complaints concerning our privacy practices please contact us at the appropriate address below.  We will attempt, where practical, to respond to your requests and to provide you with additional privacy-related information.</li>

                            <div className="elastosAddress">
                                Elastos Foundation Ltd.<br/>
                                Attn: Data Privacy Manager<br/>
                                22 North Canal Rd, #02-00<br/>
                                Singapore (048834)<br/>
                                privacy@elastos.org<br/>
                            </div>

                            <li><b>Changes To This Privacy Policy.</b> We may change our privacy policy and practices over time.  To the extent that our policy changes in a material way, the policy that was in place at the time that you submitted personal information to us will generally govern that information.</li>
                        </ul>
                    </Row>
                </div>
                <Footer/>
            </div>
        )
    }
}
