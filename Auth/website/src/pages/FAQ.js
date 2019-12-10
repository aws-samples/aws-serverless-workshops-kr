/*
 *   Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 *  Licensed under the Apache License, Version 2.0 (the "License").
 *  You may not use this file except in compliance with the License.
 *  A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the "license" file accompanying this file. This file is distributed
 *  on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *  express or implied. See the License for the specific language governing
 *  permissions and limitations under the License.
 */
import React from 'react';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';

import '../css/main.css';

const FAQ = () => {
    return (
      <div className="page-faq">
        <header className="site-header">
          <div className="site-logo">Wild Rydes</div>
          <div className="row column medium-8 large-6 xlarge-5 xxlarge-4">
            <h1 className="title">Frequently Asked Questions</h1>
          </div>
          <SiteNav/>
        </header>

        <section className="faq-list">
          <div className="row column medium-10 large-8 xxlarge-6">
            <dl>
              <dt>Q: Why should I use this app?</dt>
              <dd>A: Unicorns are faster, safer, and more reliable. In recent times, their numbers have grown significantly, reaching a scale that makes it finally possible to harness them for mass transportation at an affordable cost.</dd>
              <dt>Q: How do you recruit the unicorns? How can I know that my unicorn is trustworthy?</dt>
              <dd>A: Our unicorns are recruited from only the most humane and highest standard unicorn farms. Our unicorns are grass-fed, free range creatures raised on vegan, non-GMO diets. These unicorns are also completely safe because unicorns have infallible morality and judgment.</dd>
              <dt>Q: How do I request a unicorn?</dt>
              <dd>A: Simply download our app, then tap a button to begin. Your unicorn will arrive shortly.</dd>
              <dt>Q: How much does it cost?</dt>
              <dd>A: Since Wild Rydes is a marketplace for flight-based transportation, the price you pay is based on factors such as distance and availability of unicorns. You set the maximum price you’re willing to pay for a given ryde and then Wild Rydes matches you with a unicorn that’s willing to accept your price.</dd>
              <dt>Q: How does it work?</dt>
              <dd>A: Our product is powered by a complex algorithm which efficiently matches idle unicorns with ryders based on factors such as proximity and shortest time-to-destination. The system is built on a serverless architecture, which makes running and scaling our backend services simple and cost-effective, allowing us to reliably serve the needs of Wild Rydes’ ever growing user base.</dd>
              <dt>Q: What if I have a complaint about my unicorn?</dt>
              <dd>A: Wild Rydes is a customer obsessed company. We value each customer and want to ensure a positive experience. Therefore, we’ve staffed our customer service team with serverless chatbots that are available 24/7 to assist you.</dd>
              <dt>Q: How do I cancel my ride?</dt>
              <dd>A: Tap the “Cancel Ryde” button in the Wild Rydes app.</dd>
              <dt>Q: Can I use Wild Rydes internationally?</dt>
              <dd>A: Yes, you can use Wild Rydes in most countries except for Antarctica, Cuba, Sudan, Iran, North Korea, Syria and any other country designated by the United States Treasury's Office of Foreign Assets Control.</dd>
              <dt>Q: How do I pay for my ryde?</dt>
              <dd>A: After creating a Wild Rydes account, fill in your payment method such as credit card, debit card, Bitcoin wallet, or Vespene gas repository. After you complete your Ryde, you will automatically be charged the fare.</dd>
              <dt>Q: How many passengers can my unicorn take?</dt>
              <dd>A: The number of passengers on a single ryde depends on the size of your unicorn. Most unicorns can take one passenger per ryde. You can also request a large size unicorn which can take up to two passengers. If you select Sleigh version, you can take up to 4 passengers.</dd>
              <dt>Q: What if I lose an item during my ryde?</dt>
              <dd>A: Unfortunately, it’s unlikely we can retrieve your lost item if it has fallen off the unicorn during your ryde.</dd>
              <dt>Q: How do I share my route information with someone else?</dt>
              <dd>A: During your ryde, you can share your route and ETA with someone else using the Wild Rydes app. Simply tap the “Share Route” button and select a contact. Soon, they’ll be able to watch the status of your ryde.</dd>
              <dt>Q: How do I rate my unicorn?</dt>
              <dd>A: After your ryde completes, you have the option to rate your unicorn on the app. Our unicorns are customer obsessed and strive for 5 star ratings. Your feedback helps us improve our service!</dd>
              <dt>Q: What if my unicorn doesn’t match the photo in the app?</dt>
              <dd>A: The unicorn photo in your app should match the unicorn that arrives to pick you up. If they do not match, then Wild Rydes recommends that you do not board the unicorn. You should then immediately report the imposter unicorn to Wild Rydes.</dd>
              <dt>Q: Can I use Concur with Wild Rydes?</dt>
              <dd>A: Yes, you can connect your Concur profile to the Wild Rydes app so you can track business trips made on Wild Rydes.</dd>
              <dt>Q: Can I request a specific unicorn?</dt>
              <dd>A: While we do not allow requesting specific unicorns, you can choose the type and size of unicorn using the app.</dd>
              <dt>Q: Why do you charge a service fee?</dt>
              <dd>A: The service fee is a fixed charge added to every ryde. This helps us pay for our on-going maintenance and operating costs required to run the service and tend to our unicorn herd.</dd>
            </dl>
          </div>
        </section>
      <SiteFooter/>
      </div>
    );
};

export default FAQ;

