import React, { useState, useRef } from "react";

import { Window, WindowHeader, WindowContent, Button } from "react95";
import Draggable from "react-draggable";
import { onDragWindow } from "src/hooks/operations";

export default function Terms({ active, close, select }) {
  const windowRef = useRef(null);

  const [boundMove, setBoundMove] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });

  const handleDrag = () => {
    select();
    const position = onDragWindow(windowRef.current);
    setBoundMove(position);
  };
  return (
    <Draggable
      defaultPosition={{ x: 0, y: 0 }}
      bounds={boundMove}
      position={null}
      onDrag={handleDrag}
      allowAnyClick={true}
      handle=".move"
    >
      <Window
        className="window info infotext"
        ref={windowRef}
        style={active ? { zIndex: 129 } : { zIndex: 109 }}
      >
        <WindowHeader className="window-header" active={active}>
          <span className="move" style={{ width: "100%" }} onClick={select}>
            Privacy Policy
          </span>
          <Button onClick={() => close()}>
            <span className="close-icon" />
          </Button>
        </WindowHeader>
        <WindowContent className="window-content" onClick={select}>
          <p>
            <strong>Privacy Policy and Website Terms</strong>
            <br />
            <br />
            This privacy policy is for this website and any services provided
            through the ordinary course of business. Our website is
            bnbvault.finance (“The Website”) and is owned and operated by the
            GRISE group of companies (“The Company”). This policy governs the
            privacy of both users who choose to use our website or engage with
            any of our services for both with and without consideration
            (“Users”). <br />
            <br />
            The policy sets out the different areas where user privacy is
            concerned and outlines the obligations & requirements of the users,
            the website and The Company. Furthermore the way this website and
            company processes, stores and protects user data and information
            will also be detailed within this policy. <br />
            <br />
            <strong>1. The Website</strong>
            <br />
            <br />
            1.1 This website and its owners take a proactive approach to user
            privacy and ensure the necessary steps are taken to protect the
            privacy of its users throughout their visiting experience. This
            website complies to all international national laws and requirements
            for user privacy. <br />
            <br />
            1.2 For the avoidance of doubt the website and all company data is
            hosted, stored and maintained with third parties that can be located
            anywhere internationally. <br />
            <br />
            <strong>2. Use of Cookies</strong>
            <br />
            <br />
            2.1 This website uses cookies to better the users experience while
            visiting the website. Where applicable this website uses a cookie
            control system allowing the user on their first visit to the website
            to allow or disallow the use of cookies on their computer / device.
            This complies with recent legislation requirements for websites to
            obtain explicit consent from users before leaving behind or reading
            files such as cookies on a user’s computer / device. <br />
            <br />
            2.2 Cookies are small files saved to the user's computers hard drive
            that track, save and store information about the user's interactions
            and usage of the website. This allows the website, through its
            server to provide the users with a tailored experience within this
            website.
            <br />
            <br />
            2.3 Users are advised that if they wish to deny the use and saving
            of cookies from this website on to their computers hard drive they
            should take necessary steps within their web browsers security
            settings to block all cookies from this website and its external
            serving vendors. <br />
            <br />
            2.4 This website uses tracking software to monitor its visitors to
            better understand how they use it. This software is provided by
            companies such as Google Analytics which uses cookies to track
            visitor usage. The software will save a cookie to your computers
            hard drive in order to track and monitor your engagement and usage
            of the website, but will not store, save or collect personal
            information. You can read Google's privacy policy here for further
            information http:// www.google.com/privacy.html <br />
            <br />
            2.5 Other cookies may be stored to your computers hard drive by
            external vendors when this website uses referral programs, sponsored
            links or adverts. Such cookies are used for conversion and referral
            tracking and typically expire after 30 days, though some may take
            longer. No personal information of any kind is stored, saved or
            collected. <br />
            <br />
            <strong>3. Contact & Communication</strong> <br />
            <br />
            3.1 Users contacting this website and/or The Company do so at their
            own discretion and provide any such personal details requested at
            their own risk. Your personal information is kept private and stored
            securely until a time it is no longer required or has no use, as
            detailed in the Data Protection Laws. Every effort has been made to
            ensure a safe and secure form to email submission process but advise
            users using such form to email processes that they do so at their
            own risk. <br />
            <br />
            3.2 This website and its owners use any information submitted to
            provide you with further information about the products / services
            they offer or to assist you in answering any questions or queries
            you may have submitted.
            <br />
            <br />
            3.3 This includes using your details to subscribe you to any email
            newsletter program the website operates but only if this was made
            clear to you and your express permission was granted when submitting
            any form to email process. Or whereby you the consumer have
            previously purchased from or inquired about purchasing from the
            company a product or service that the email newsletter relates to.
            This is by no means an entire list of your user rights in regard to
            receiving email marketing material. Your details are not passed on
            to any third parties. <br />
            <br />
            3.4 In sending the company or the website your personal information
            you are consenting to allow the company to contact you subject to
            the above conditions. Any data held by the company relating to
            individuals will be stored and destroyed once a period of 12 months
            of no communication has occurred between The User and The Company.{" "}
            <br />
            <br />
            3.5 The company will never knowingly or willingly pass information
            it holds on Users (For clarity this includes: clients, prospects, or
            website users) onto a third party without the consent of the said
            user. <br />
            <br />
            <strong>4. Email</strong> <br />
            <br />
            4.1 From time to time The Company operates various email campaigns
            program, (at all times we refer to these as a Newsletter Program)
            used to inform subscribers about products and services supplied by
            this website. Users can subscribe through an online automated
            process should they wish to do so but do so at their own discretion.
            Some subscriptions may be manually processed through prior written
            agreement with the user. <br />
            <br />
            4.2 Subscriptions are taken in compliance with Spam Laws detailed in
            the Privacy and Electronic Communications Regulations 2003. All
            personal details relating to subscriptions are held securely and in
            accordance with the Data Protection Laws. No personal details are
            passed on to third parties nor shared with companies / people
            outside of the company that operates this website. Under the Data
            Protection Laws you may request a copy of personal information held
            about you by this website's email newsletter program. A small fee
            will be payable. If you would like a copy of the information held on
            you please write to the business address at the bottom of this
            policy. <br />
            <br />
            4.3 Email marketing campaigns published by this website or its
            owners may contain tracking facilities within the actual email.
            Subscriber activity is tracked and stored in a database for future
            analysis and evaluation. Such tracked activity may include; the
            opening of emails, forwarding of emails, the clicking of links
            within the email content, times, dates and frequency of activity
            [this is by no far a comprehensive list].
            <br />
            <br />
            4.4 This information is used to refine future email campaigns and
            supply the user with more relevant content based around their
            activity. <br />
            <br />
            4.5 In compliance with EU Spam Laws and the Privacy and Electronic
            Communications Regulations 2003, and GDPR subscribers are given the
            opportunity to un-subscribe at any time through an automated system.
            This process is detailed at the footer of each email campaign. If an
            automated un-subscription system is unavailable clear instructions
            on how to un-subscribe will by detailed instead. <br />
            <br />
            4.6 At all times our email campaigns are run through third party
            providers such as Mailchimp. Users are advised to refer to the
            specific terms and conditions attached to these third party
            companies. Users can easily remove themselves from any email
            communication by “unsubscribing”. 4.7 The Company holds no liability
            as to any damages or losses associated with the use of any third
            party email service provider. In engaging with the company or
            continuing use of the website you hereby expressly accept that the
            Company holds no such liability <br />
            <br />
            <strong>5. External Links</strong> <br />
            <br />
            5.1 While ever effort has been made to include quality, safe and
            relevant external links within this website, users are advised adopt
            a policy of caution before clicking any external web links mentioned
            throughout this website. (External links are clickable text / banner
            / image links to other websites) <br />
            <br />
            5.2 The owners of this website and the company cannot guarantee or
            verify the contents of any externally linked website despite their
            best efforts. Users should therefore note they click on external
            links at their own risk and this website and its owners cannot be
            held liable for any damages or implications caused by visiting any
            external links mentioned. <br />
            <br />
            <strong>6. Adverts and Sponsored Links</strong> <br />
            <br />
            6.1 This website may contain sponsored links and adverts. These will
            typically be served through our advertising partners, to whom may
            have detailed privacy policies relating directly to the adverts they
            serve. <br />
            <br />
            6.2 Clicking on any such adverts will send you to the advertisers
            website through a referral program which may use cookies and will
            track the number of referrals sent from this website. This may
            include the use of cookies which may in turn be saved on your
            computers hard drive. Users should therefore note they click on
            sponsored external links at their own risk and this website and its
            owners cannot be held liable for any damages or implications caused
            by visiting any external links mentioned. <br />
            <br />
            6.3 The owners of this website and the company cannot guarantee or
            verify the contents of any externally linked website despite their
            best efforts. Users should therefore note they click on external
            links at their own risk and this website and its owners cannot be
            held liable for any damages or implications caused by visiting any
            external links mentioned. <br />
            <br />
            <strong>7. Social Media Platforms</strong> <br />
            <br />
            7.1 Communication, engagement and actions taken through external
            social media platforms that this website, the company, and its
            owners participate on are custom to the terms and conditions as well
            as the privacy policies held with each social media platform
            respectively. <br />
            <br />
            7.2 Users are advised to use social media platforms wisely and
            communicate / engage upon them with due care and caution in regard
            to their own privacy and personal details. This website nor its
            owners will ever ask for personal or sensitive information through
            social media platforms and encourage users wishing to discuss
            sensitive details to contact them through primary communication
            channels such as by telephone or email. <br />
            <br />
            7.3 This website may use social sharing buttons which help share web
            content directly from web pages to the social media platform in
            question. Users are advised before using such social sharing buttons
            that they do so at their own discretion and note that the social
            media platform may track and save your request to share a web page
            respectively through your social media platform account. <br />
            <br />
            7.4 The Company holds responsibility for any and all comments, posts
            or any other action taken on social media belonging to the company.
            Social media can easily be identified as belonging to the company by
            the name of the account on the relevant social media platform. Any
            and all comments and actions made on social media are not intended
            to cause offence or serve as a defamatory action. Each and every
            posting will be checked for accuracy. 7.6 If you believe your
            intellectual property rights, personal rights, or any other rights
            have been infringed by any action on social media you are to notify
            the company as soon as possible so that the company has an
            opportunity to rectify and/or remove the post. <br />
            <br />
            <strong>8. Shortened Links in Social Media</strong> <br />
            <br />
            8.1 This website and its owners through their social media platform
            accounts may share web links to relevant web pages. By default some
            social media platforms shorten lengthy domains and URL's to third
            party pages. <br />
            <br />
            8.2 Users are advised to take caution and good judgement before
            clicking any shortened urls published on social media platforms by
            this website and its owners. Despite the best efforts to ensure only
            genuine urls are published many social media platforms are prone to
            spam and hacking and therefore this website and its owners cannot be
            held liable for any damages or implications caused by visiting any
            shortened links. <br />
            <br />
            <strong>9. Governing Law and Jurisdiction</strong> <br />
            <br />
            9.1 This privacy policy and any and all items posted on behalf of
            the company are strictly subject to the Laws of the Republic of
            Seychelles. Any disagreement that arises under the use of personal
            information shall be resolved through the Courts of the Republic of
            Seychelles. <br />
            <br />
            9.2 The User, in using the website or engaging in social media
            belonging to the company expressly agrees that they are accepting
            the terms of this privacy policy. <br />
            <br />
            9.3 Any disagreement and all notices are to be delivered to the
            company registers office. <br />
            <br />
            9.4 If any part of this policy is found to be defective, the
            remaining elements of the policy shall remain in place. <br />
            <br />
            9.5 The Company registered office and address for service can be
            found on the website. <br />
            <br />
            <strong>Special GDPR Notice</strong>
            <br />
            <br /> Citizens of the European Union have the right to track their
            data under the GDPR regulations brought into force within 2018. In
            using the company website you are hereby agreeing to the following
            terms and give your consent for such data to be stored as contained
            in accordance with this GDPR notice.
            <br />
            <br /> <strong>Data Control Officer</strong> <br />
            <br />
            The data control officer is based at the company head quarters which
            can be found in our Terms and Conditions document. You can reach the
            Data controller by emailing the company at the contact@email address
            located on the company website, or use the methods contained within
            the company website for contact with us. We will aim to reply to you
            within 72 hours. You may request all information and documentation
            held about you by the company. <br />
            <br />
            <strong>Purpose of the processing.</strong> <br />
            <br />
            The information is collected in the interest of Know Your Client and
            Anti Money Laundering regulations. The company is allowing
            individuals to participate in a crowdfunding exercise. Some
            jurisdictions do not allow its citizens and residents to participate
            in such activities. We therefore are required to collect basic
            information on those who participate to demonstrate, when necessary,
            that citizens and residents of that jurisdiction did not participate
            in the crowdfunding. The legal basis for this processing of data is
            found in international law (different laws from different countries)
            including but not limited to, The UK financial Services Act, The US
            Securities Legislation, European Monetary laws and regulations
            (including those of its member states), Chinese Financial Code,
            anti-money laundering laws, and antiterrorism laws. <br />
            <br />
            <strong>Third Parties</strong>
            <br />
            <br />
            Data may from time to time, be shared with third parties for the
            purposes of conducting a Know Your Client assessment so that
            participants can prove their location, residence, and citizenship.
            All parties that have access to your data will be members of the
            necessary data controlling bodies of their respective countries. For
            example, the Information Commissioners Office of the United Kingdom.
            <br />
            <br />
            <strong>Recipients of the Data</strong>
            <br />
            <br /> At all times our compliance team with Gresham International
            will have access to the data. They are regulated by the Information
            Commissioners Office and will not share that data with any third
            party. <br />
            <br />
            <strong>Safeguards</strong> <br />
            <br />
            Your data will never be shared with any third party without your
            consent or court order provided by a court of competent jurisdiction
            within the country making the request. <br />
            <br />
            <strong>Retention Period</strong> <br />
            <br />
            All data will be stored for a period of a minimum of six months and
            a maximum of two years.
            <br />
            <br /> <strong>The Existence of your rights</strong>
            <br />
            <br /> Nothing within this agreement or the company’s process
            impacts your rights under the GDPR. <br />
            <br />
            <strong>The right to withdraw consent</strong>
            <br />
            <br />
            You may, at any time, request the right to know what information is
            held by the company relating to you. This request can only be made
            once as data is only captured once during the registration and
            participation process. As the information is required for anti-money
            laundering and antiterrorism laws, we are obliged to keep any and
            all information relating to you. <br />
            <br />
            <strong>The right to lodge a compliant</strong>
            <br />
            <br />
            Citizens of the EU may file a complaint with the relevant data
            controller within their country. Complaints should first be made to
            the company so that we can investigate any issues relating to the
            storage or use of your data. <br />
            <br />
            <strong>Source of Data</strong>
            <br />
            <br />
            All data collected on you will be done so by your submission of the
            information and collection of information from the machine you
            access the website with. Data collection is limited to that
            contained in our registration method and that information which your
            computer automatically transmits to our company when accessing our
            site such as cookies and IP data. <br />
            <br />
            <strong>Special California Data Protection Notice</strong>
            <br />
            <br />
            This organisation does not have over $25 million in turnover, does
            not store data on over 50,000 individuals, and does not collect half
            or more of our revenue from the sale of personal data.
          </p>
        </WindowContent>
      </Window>
    </Draggable>
  );
}
