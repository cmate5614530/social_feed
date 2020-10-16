import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import './terms.css'
const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  bodytext:{
      padding:theme.spacing.unit*2
  },
  bodyparagraph:{
      paddingBottom:theme.spacing.unit*3
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);



 

  return (
    <div>
      
      <Dialog fullScreen open={true} onClose={props.handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit"
             onClick={() => props.history.push("/")} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
            Privacy Policy
            </Typography>
           
          </Toolbar>
        </AppBar>
        <div className={classes.bodytext}>
        
        
        

        <p>We at www.buzzraker.com are committed to protecting your privacy. We have prepared this Privacy Policy to describe to you our practices regarding the personal data we collect from users of our website.</p>
<p>By using the Services, users consent to the collection and use of their Personal Data by us. You also represent to us that you have any and all authorizations necessary to use these Services including using them to process Personal Data. We collect and use the information you provide to us, including information obtained from your use of the Services. Also, we may use the information that we collect for our internal purposes to develop, tune, enhance, and improve our Services, and for advertising and marketing consistent with this Privacy Policy.</p>
<p>This privacy policy has been compiled to better serve those who are concerned with how their 'Personal Data&rsquo; is being used online. Personal Information means data which relate to a living individual who can be identified &ndash; (a) from those data, or (b) from those data and other information which is in the possession of, or is likely to come into the possession of, the data controller, and includes any expression of opinion about the individual and any indication of the intentions of the data controller or any other person in respect of the individual.</p>
<p>Please read our privacy policy carefully to get a clear understanding of how our website collects, uses, protects or otherwise handles users&rsquo; Personal Data.</p>
<p>This Privacy Policy is intended to inform users about how our website treats Personal Data that it processes about users. If users do not agree to any part of this Privacy Policy, then we cannot provide its Services to users and users should stop accessing our services.</p>
<p>By using the Services, You acknowledge, consent and agree that we may collect, process, and use the information that you provide to us and that such information shall only be used by us or third parties acting under our direction, pursuant to confidentiality agreements, to develop, tune, enhance, and improve the Services. Although we may attempt to notify you when changes are made to this Privacy Policy, you are responsible for periodically reviewing any changes which may be made to the Policy. We may, in our sole discretion, modify or revise the Policy at any time, and you agree to be bound by the same.</p>
<p>Our privacy policy is subject to change at any time without notice. To make sure you are aware of any changes, please review this policy periodically.</p>
<ol>
<li><strong><u>INFORMATION WE COLLECT:</u></strong>
<ul>
<li>You provide us information about yourself &ndash; Your Full Name, E-mail Address. If you correspond with us by e-mail, we may retain the content of your e-mail messages, your e-mail address, and our responses. Additionally, we store information about users&rsquo; contacts when users manually enter contact e-mail addresses or transfer contact information from other online social networks. We also collect general information about your use of our services.</li>
<li><strong>Basic Account Information: </strong>You don&rsquo;t have to create an account to use some of our service features, such as searching and viewing public profiles. If you do choose to create an account, you must provide us with some personal data so that we can provide our services to you. On our websites this includes a display name, a username, a password, and an email address or phone number. Your display name and username are always public, but you can use either your real name or a pseudonym.</li>
<li><strong>Public Information:</strong> Most activity on website is public, including your profile information, your time zone and language, when you created your account, and your Posts and certain information about your posts like the date, time, and application and version of platform you posted from. You also may choose to publish your location in your posts or your profile. The lists you create, people you follow and who follow you, and posts you Like or Repost or share are also public. Information posted about you by other people who use our services may also be public. For example, other people may tag you in a photo (if your settings allow) or mention you in a post. You are responsible for your posts and other information you provide through our services, and you should think carefully about what you make public, especially if it is sensitive information. If you update your public information on website, such as by deleting a post or deactivating your account, we will reflect your updated content on our platform.</li>
</ul>
</li>
</ol>
<ol start="2">
<li><strong><u>INFORMATION WE COLLECT AUTOMATICALLY WHEN YOU USE OUR SERVICES:</u></strong></li>
</ol>
<ul>
<li>When you access or use our Services, we automatically collect information about you, including:</li>
</ul>
<ol>
<li>Usage Information: If you choose to post messages on our website, online chats or other message areas we retain this information as necessary to resolve disputes, provide customer support and troubleshoot problems as permitted by law. If you send us personal correspondence, such as emails or letters, or if other users or third parties send us correspondence about your activities on the Website, we may collect such information into a file specific to you.</li>
<li>Log Information: We log information about your use of our Website, including your browser type and language, access times, pages viewed, your IP address and the Website you viewed before navigating to our Website.</li>
<li>Device Information: We may collect information about the device you use to access our Services, including the hardware model, operating system and version, unique device identifier, phone number, International Mobile Equipment Identity ("IMEI") and mobile network information.</li>
<li>Location Information: We may collect information about the location of your device to facilitate your use of certain features of our Services, determine the speed at which your device is traveling, add location-based filters (such as local weather), and for any other purposes.</li>
<li>Information Collected by Cookies and Other Tracking Technologies: We use various technologies to collect information, and this may include sending cookies to you. A</li>
</ol>
<p>"cookie" is a small data file transferred to your computer&rsquo;s hard drive that allows a</p>
<p>Website to respond to you as an individual, gathering and remembering information about your preferences in order to tailor its operation to your needs, likes and dislikes. Overall, cookies are safe, as they only identify your computer to customize your Web experience. Accepting a cookie does not provide us access to your computer or any Personally Identifiable Information about you, other than the information you choose to share. Other servers cannot read them, nor can they be used to deliver a virus. Most browsers automatically accept cookies, but you can usually adjust yours (Microsoft Internet Explorer, Firefox or Google Chrome) to notify you of cookie placement requests, refuse certain cookies, or decline cookies completely. If you turn off cookies completely, there may be some Website features that will not be available to you, and some Web pages may not display properly. To support the personalized features of our Website (such as your country and language codes and browsing functions) we must send a cookie to your computer&rsquo;s hard drive and/or use cookie-based authentication to identify you as a registered Website user. We do not, however, use so-called "surveillance" cookies that track your activity elsewhere on the Web. We may also collect information using web beacons (also known as "tracking pixels").</p>
<ol>
<li>&ldquo;Web beacons&rdquo; or clear .gifs are small pieces of code placed on a Web page to monitor behavior and collect data about the visitors viewing a Web page. For example, Web beacons or similar technology can be used to count the users who visit a Website or to deliver a cookie to the browser of a visitor viewing that page. We may use Web beacons or similar technology on our Services from time to time for this and other purposes.</li>
</ol>
<ol start="3">
<li><strong><u>HOW WE USE YOUR INFORMATION:</u></strong></li>
<li>We use the personal information we collect to fulfill your requests for services, improve our services, contact you, conduct research, and provide anonymous reporting for internal and external clients.</li>
<li>By providing us your e-mail address, you consent to us using the e-mail address to send you our Website and services related notices, including any notices required by law, in lieu of communication by postal mail. You also agree that we may send notifications of activity on our Website to the e-mail address you give us, in accordance with any applicable privacy settings. We may use your e-mail address to send you other messages, such as newsletters, changes to our features, new services, events or other information. You may not modify your settings to opt out of any emails from us.</li>
</ol>
<ul>
<li>Following termination or deactivation of your services, we may (but are under no obligation to) retain your information for archival purposes. We will not publicly disclose any of your personally identifiable information other than as described in this Privacy Policy.</li>
</ul>
<ol>
<li>At our sole discretion, for any reason or no reason at all, we reserve the right to remove any content or messages, if we believe that such action is necessary (a) to conform to the law, comply with legal process served on us or our affiliates, or investigate, prevent, or take action regarding suspected or actual illegal activities;</li>
</ol>
<p>to enforce this policy, to take precautions against liability, to investigate and defend ourselves against any third-party claims or allegations, to assist government enforcement agencies, or to protect the security or integrity of our Website; or (c) to exercise or protect the rights, property, or personal safety of the Website, our users, or others.</p>
<ol>
<li>As our businesses continue to evolve, we might sell one or more of our companies, subsidiaries or business units. In such transactions, personally identifiable information generally is one of the transferred business In such event, this Privacy Policy may be amended as set forth below or the collection and uses of your personally identifiable information may be governed by a different privacy policy.</li>
<li>We reserve the right to release personally identifiable information to unaffiliated third parties when we believe its release is appropriate to comply with the law, enforce or apply our Terms and Conditions and other agreements, or protect the rights, property or safety of Trader Interactive, our users or others. This includes exchanging information with other unaffiliated third parties in connection with fraud protection and credit risk reduction.</li>
</ol>
<ul>
<li>We may transmit the user data across the various Websites of the Company.</li>
<li>If you participate in any online forum/communities, chat sessions and/or blogs, or otherwise post in any user comment field visible to other users of our Services, any information that you submit or post will be visible to and may be read, collected or used by others who use our Services. We are not responsible for any information, including personally identifiable information, you choose to submit in any such user comment field.</li>
</ul>
<ol start="4">
<li><strong><u>HOW WE SHARE YOUR INFORMATION:</u></strong></li>
<li>As a matter of policy, we will not sell or rent information about you and we will not disclose information about you in a manner inconsistent with this Privacy Policy except as required by law or government regulation. We cooperate with law enforcement inquiries, as well as other third parties, to enforce laws such as those regarding intellectual property rights, fraud and other personal rights.</li>
<li>WE CAN (AND YOU AUTHORIZE US TO) DISCLOSE ANY INFORMATION ABOUT YOU TO LAW ENFORCEMENT, OTHER GOVERNMENT OFFICIALS, ANY LAWSUIT OR ANY OTHER THIRD PARTY THAT WE, IN OUR SOLE DISCRETION, BELIEVE NECESSARY OR WEBSITEROPRIATE IN CONNECTION WITH AN INVESTIGATION OF FRAUD, INTELLECTUAL PROPERTY INFRINGEMENT, OR OTHER ACTIVITY THAT IS ILLEGAL OR MAY EXPOSE US, OR YOU, TO LIABILITY.</li>
<li><strong><u>ENSURING INFORMATION IS ACCURATE AND UP-TO-DATE</u></strong></li>
<li>We take reasonable precautions to ensure that the Personal Information we Collect, Use and Disclose is complete, relevant and up-to-date. However, the accuracy of that information depends to a large extent on the information you provide. That's why we recommend that you:</li>
<li>Let us know if there are any errors in your Personal Information; and</li>
<li>Keep us up-to-date with changes to your Personal Information such as your name or address.</li>
<li><strong><u>HOW WE PROTECT YOUR INFORMATION:</u></strong></li>
<li>We are very concerned about safeguarding the confidentiality of your personally identifiable information. We employ administrative, physical and electronic measures designed to protect your information from unauthorized access.</li>
<li>By using this Website or the Services or providing Personal Information to us, you agree that we can communicate with you electronically regarding security, privacy, and administrative issues relating to your use of this Website or Services.</li>
</ol>
<ul>
<li>We use commercially reasonable physical, managerial, and technical safeguards to preserve the integrity and security of your Personal Information. Your sensitive information, such as password, is encrypted when it is transmitted to us. Our employees are trained and required to safeguard your information. We cannot, however, ensure or warrant the security of any information you transmit to us and you do so at your own risk. Using unsecured wi-fi or other unprotected networks to submit messages through the Service is never recommended. Once we receive your transmission of information, we make commercially reasonable efforts to ensure the security of our systems. However, please note that this is not a guarantee that such information may not be accessed, disclosed, altered, or destroyed by breach of any of our physical, technical, or managerial safeguards. If we learn of a security systems breach, then we may attempt to notify you electronically so that you can take appropriate protective steps.</li>
</ul>
<ol>
<li>Notwithstanding anything to the contrary in this Policy, we may preserve or disclose your information if we believe that it is reasonably necessary to comply with a law, regulation or legal request; to protect the safety of any person; to address fraud, security or technical issues; or to protect our rights or property. However, nothing in this Policy is intended to limit any legal defenses or objections that you may have to a third party, including a government&rsquo;s, request to disclose your information.</li>
<li>However, no data transmission over the Internet or data storage system can be guaranteed to be 100% secure. Please do not send us credit card information and/or other sensitive information through email. If you have reason to believe that your interaction with us is not secure (for example, if you feel that the security of any account you might have with us has been compromised), you must immediately notify us of the problem by contacting us in accordance with the "Contacting Us" section available on our Website.</li>
<li><strong><u>YOUR CHOICES ABOUT YOUR INFORMATION:</u></strong></li>
<li>You have several choices regarding use of information on our Services:
<ol>
<li>Email Communications: We will periodically send you free newsletters and e- mails that directly promote the use of our Website, or Services. Despite your e-mail preferences, we may send you service related communications, including notices of any updates to our Terms of Use or Privacy Policy.</li>
<li>You may, of course, decline to submit personally identifiable information through the Website, in which case, we will not be able to provide our services to you.</li>
</ol>
</li>
</ol>
<ol start="8">
<li><strong><u>STORING PERSONAL DATA </u></strong></li>
</ol>
<p>We retain your information only for as long as is necessary for the purposes for which we process the information as set out in this policy. However, we may retain your Personal Data for a longer period of time where such retention is necessary for compliance with a legal obligation to which we are subject, or in order to protect your vital interests or the vital interests of another natural person.</p>
<p>&nbsp;</p>
<ol start="9">
<li><strong><u>CHILDREN&rsquo;S PRIVACY:</u></strong></li>
</ol>
<p>Our services are available only to persons who can form a legally binding contract with us as per the applicable laws. Protecting the privacy of young children is especially important. Thus, we do not knowingly collect or solicit personal information from anyone under the age of 18 or knowingly allow such persons to register. If you are under 18, please do not attempt to register for the Service or send any information about yourself to us, including your name, address, telephone number, or email address. No one under the age of 18 may provide any personal information for listing any service.</p>
<p><strong><u>MERGER AND ACQUISITIONS:. </u></strong></p>
<p>In case of a merger or acquisition, we reserve the right to transfer all the information, including personally identifiable information, stored with us to the new entity or company thus formed. Any change in the Website&rsquo;s policies and standing will be notified to you through email.</p>
<ol start="10">
<li><strong><u>LINKS TO THIRD PARTY WEBSITE:</u></strong></li>
</ol>
<p>Our website contains links to other websites. The fact that we link to a website is not an endorsement, authorization or representation of our affiliation with that third party. We do not exercise control over third party websites. These other websites may place their own cookies or other files on your computer, collect data or solicit personally identifiable information from you. Other websites follow different rules regarding the use or disclosure of the personally identifiable information you submit to them. We encourage you to read the privacy policies or statements of the other websites you visit.</p>
<ol start="11">
<li><strong><u>NOTIFICATION PROCEDURES:</u></strong></li>
</ol>
<p>It is our policy to provide notifications, whether such notifications are required by law or are for marketing or other business related purposes, to you via e-mail notice, written or hard copy notice, or through conspicuous posting of such notice on the Website, as determined by us in our sole discretion. We reserve the right to determine the form and means of providing notifications to you, provided that you may opt out of certain means of notification as described in this Privacy Policy.</p>
<ol start="12">
<li><strong><u>OPTING OUT OF INFORMATION SHARING:</u></strong></li>
<li>We understand and respect that not all users may want to allow us to share their information with other select users or companies. If you do not want us to share your information, please do not register an account with us.</li>
<li><strong><u>USER SUBMISSIONS</u></strong></li>
</ol>
<p>You understand that when using the Platform, you will be exposed to Content from a variety of sources, and that we are not responsible for the accuracy, usefulness, safety, or intellectual property rights of or relating to such Content and you agree and assume all liability for your use. You further understand and acknowledge that you may be exposed to Content that is inaccurate, offensive, indecent, or objectionable, defamatory or libelous and you agree to waive, and hereby do waive, any legal or equitable rights or remedies you have or may have against us with respect thereto. If you find any content to be libelous, objectionable, defamatory, and indecent or infringing your Intellectual Property Rights, you may contact us directly through &ldquo;Contact Us&rdquo; page and we shall take appropriate action to remove such content from the Website.</p>
<ol start="14">
<li><strong><u>PHISHING OR FALSE EMAILS:</u></strong></li>
</ol>
<p>If you receive an unsolicited email that appears to be from us or one of our members that requests personal information (such as your credit card, login, or password), or that asks you to verify or confirm your account or other personal information by clicking on a link, that email was likely to have been sent by someone trying to unlawfully obtain your information, sometimes referred to as a "phisher" or "spoofer." We do not ask for this type of information in an email. Do not provide the information or click on the link.</p>
<ol start="15">
<li><strong><u>CHANGES TO OUR PRIVACY POLICY:</u></strong></li>
<li>We may update this Privacy Policy and information security procedures from time to time. If these privacy and/or information security procedures materially change at any time in the future, we will post the new changes conspicuously on the Website to notify you and provide you with the ability to opt out in accordance with the provisions set forth above. Continued use of our Website and Service, following notice of such changes shall indicate your acknowledgement of such changes and agreement to be bound by the terms and conditions of such changes.</li>
<li><strong><u>COLLECTION OF INFORMATION BY THIRD-PARTY WEBSITES, SERVICES, AD SERVERS AND SPONSORS</u></strong></li>
<li>Our Services may contain links to other Websites or services whose information practices may be different than ours. For example, while using one or more of our Websites, you may link to a third party&rsquo;s Website via a window opened within (or on top of) our Website. Some of our Services may allow users to interface with third party Websites or services, such as Facebook and Twitter. You will remain logged into those third party Websites or services until you actively log off. By interfacing with those third party Websites or services, you are allowing our Services to access your information that is or becomes available via such third party Websites or services, and you are agreeing to those third party&rsquo;s applicable terms and conditions. Once you log onto any such third party Websites or services, the content you post there may also post to our Services. Our Privacy Policy and procedures may or may not be consistent with the policies and procedures of such third party Websites or services, and when you visit such Websites or services our Privacy Policy does not apply to personally identifiable information and other data collected by the third party. You should consult, read and understand the privacy notices of such third parties before choosing to provide personally identifiable information on any such Websites or services.</li>
<li>Our Services may also use a third party ad server to present the advertisements that you may see on our Services. These third party ad servers may use cookies, Web beacons, clear .gifs or similar technologies to help present such advertisements, and to help measure and research the advertisements&rsquo; effectiveness. The use of these technologies by these third party ad servers is subject to their own privacy policies and is not covered by our Privacy Policy.</li>
<li><strong><u>BREACH OF PRIVACY POLICY:</u></strong></li>
</ol>
<p>We reserve the right to terminate or suspend your usage of this Website immediately if you are found to be in violation of our privacy policy. We sincerely request you to respect privacy and secrecy concerns of others. The jurisdiction of any breach or dispute shall be United States of America.</p>
<ol start="18">
<li><strong><u>NO RESERVATIONS:</u></strong></li>
</ol>
<p>We do not accept any reservation or any type of limited acceptance of our privacy policy. You expressly agree to each and every term and condition as stipulated in this policy without any exception whatsoever.</p>
<ol start="19">
<li><strong><u>NO CONFLICT:</u></strong></li>
</ol>
<p>The policy constitutes a part of the user terms. We have taken utmost care to avoid any inconsistency or conflict of this policy with any other terms, agreements or guidelines available on our Website. In case there exists a conflict, we request you to kindly contact us for the final provision and interpretation.</p>

        </div>
      </Dialog>
    </div>
  );
}



