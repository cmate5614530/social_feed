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
             Terms and Condition
            </Typography>
           
          </Toolbar>
        </AppBar>
        <div className={classes.bodytext}>
        
        
        
        <p>Welcome to www.buzzraker.com (hereinafter referred to as the &ldquo;website&rdquo; or &ldquo;site&rdquo; or &ldquo;we&rdquo; or &ldquo;us&rdquo;). The website is offered to you conditioned on your acceptance without modification of the terms, conditions, and notices contained herein (the "Terms"). Your use of our website constitutes your agreement to all such Terms.</p>
<p>Our website is owned and operated by KHARAHIYA TRADING LLC with its office located in TX, USA.</p>
<p>By using the Site, you agree to comply with and be legally bound by the terms and conditions of these Terms of Service ("Terms"). These Terms govern your access to and use of the Site and Services and all Collective Content, and constitute a binding legal agreement between you and us.</p>
<p>Please read carefully these Terms and our Privacy Policy. If you do not agree to these Terms, you have no right to obtain information from or otherwise continue using the Site. Failure to use the Site in accordance with these Terms may subject you to civil and criminal penalties.</p>
<p>Our website is a social networking platform wherein users can put up their post, interact and socialize with other users.</p>
<p>The use of this Website constitutes your consent to, and agreement to, abide by the most current version of these terms and conditions (the "Terms"). We may at any time revise these terms and conditions by updating the Terms. You agree to be bound by subsequent revisions and agree to review the Terms periodically for changes to the terms and conditions. The most up to date version of the Terms will always be available for your review with link at the bottom of the Website.</p>
<p>This website reserves the right to recover the cost of services, collection charges and lawyers fees from persons using the Site fraudulently. This website reserves the right to initiate legal proceedings against such persons for fraudulent use of the Site and any other unlawful acts or acts or omissions in breach of these terms and conditions.</p>
<p>PLEASE READ THESE TERMS OF USE AND CAREFULLY AS THEY CONTAIN IMPORTANT INFORMATION REGARDING YOUR LEGAL RIGHTS, REMEDIES AND OBLIGATIONS. THESE INCLUDE VARIOUS LIMITATIONS AND EXCLUSIONS, AND A CLAUSE THAT GOVERNS THE JURISDICTION AND VENUE OF DISPUTES.</p>
<p>IN USING THIS WEBSITE YOU ARE DEEMED TO HAVE READ AND AGREED TO THE FOLLOWING TERMS AND CONDITIONS SET FORTH HEREIN. ANY INCIDENTAL DOCUMENTS AND LINKS MENTIONED SHALL BE CONSIDERED TO BE ACCEPTED JOINTLY WITH THESE TERMS. YOU AGREE TO USE THE WEBSITE ONLY IN STRICT INTERPRETATION AND ACCEPTANCE OF THESE TERMS AND ANY ACTIONS OR COMMITMENTS MADE WITHOUT REGARD TO THESE TERMS SHALL BE AT YOUR OWN RISK. THESE TERMS AND CONDITIONS FORM PART OF THE AGREEMENT BETWEEN THE USERS AND US. BY ACCESSING THIS WEBSITE, AND/OR UNDERTAKING TO PERFORM A SERVICE BY US INDICATES YOUR UNDERSTANDING, AGREEMENT TO AND ACCEPTANCE, OF THE DISCLAIMER NOTICE AND THE FULL TERMS AND CONDITIONS CONTAINED HEREIN.</p>
<ol>
<li><strong><u>DEFINITIONS AND INTERPRETATION:</u></strong></li>
<li>"Agreement" means the terms and conditions as detailed herein including all Exhibits, privacy policy, other policies mentioned on the website and will include the references to this agreement as amended, negated, supplemented, varied or replaced from time to time.</li>
<li>&ldquo;Website&rdquo; means the social networking platform wherein the users can post their views, connect with their friends, other users who socialize on the platform. This also refers to every link and sub-link on www.buzzraker.com.</li>
</ol>
<ul>
<li>&ldquo;Account&rdquo; means the accounts created by the users at the time of registration and through which you can access the website and do such activities as provided on the website.</li>
</ul>
<ol>
<li>"User&rdquo; means the individual who uses our website.</li>
<li>&ldquo;Content&rdquo; means text, graphics, images, music, audio, video, information or other materials.</li>
<li>&ldquo;User content&rdquo; means all Content that a user posts, uploads, publishes, submits or transmits to be made available through our website.</li>
</ol>
<ul>
<li>The official language of these terms shall be English.</li>
<li>The headings and sub-headings are merely for convenience purpose and shall not be used for interpretation.</li>
</ul>
<ol start="2">
<li><strong><u>ELIGIBILITY OF MEMBERSHIP:</u></strong></li>
<li>Use of the Site is available only to persons who can form legally binding contracts under applicable law.</li>
<li>Except where additional terms and conditions are provided which are product specific, these terms and conditions supersede all previous representations, understandings, or agreements and shall prevail notwithstanding any variance with any other terms of any order submitted. By using the services of our website you agree to be bound by the Terms and Conditions.</li>
<li><strong><u>REGISTRATION:</u></strong></li>
<li>In order to avail our services, you shall be required to create an account with us. You will have to provide us with various information such as full name, email address and city, state and country of residence.</li>
<li>You represent and warrant that all required registration information you submit is truthful and accurate, and you will maintain the accuracy of such information. You are responsible for maintaining the confidentiality of your Account login information and are fully responsible for all activities that occur under your Account. You agree to immediately notify us of any unauthorized use, or suspected unauthorized use of your Account or any other breach of security. The website cannot and will not be liable for any loss or damage arising from your failure to comply with the above requirements. You must not share your password or other access credentials with any other person or entity that is not authorized to access your account. Without limiting the foregoing, you are solely responsible for any activities or actions that occur under your website account access credentials. We encourage you to use a &ldquo;strong&rdquo; password (a password that includes a combination of upper and lower case letters, numbers, and symbols, etc.) with your account. We cannot and will not be liable for any loss or damage arising from your failure to comply with any of the above.</li>
</ol>
<ul>
<li>You agree to provide and maintain accurate, current and complete information about your Account. Without limiting the foregoing, in the event you change any of your personal information as mentioned above in this Agreement, you will update your Account information promptly.</li>
</ul>
<ol>
<li>When creating an Account, don&rsquo;t:</li>
<li>Provide any false personal information to us (including without limitation a false username) or create any Account for anyone other than yourself without such other person&rsquo;s permission;</li>
<li>Use a username that is the name of another person with the intent to impersonate that person;</li>
<li>Use a username that is subject to rights of another person without appropriate authorization; or</li>
<li>Use a username that is offensive, vulgar or obscene or otherwise in bad taste.</li>
<li>We reserve the right to suspend or terminate your Account if any information provided during the registration process or thereafter proves to be inaccurate, false or misleading or to reclaim any username that you create through the Service that violates our Terms. If you have reason to believe that your Account is no longer secure, then you must immediately notify us through contact us form available after creating an account.</li>
<li>You may not transfer or sell your website account and User ID to another party. If you are registering as a business entity, you personally guarantee that you have the authority to bind the entity to this Agreement.</li>
</ol>
<ul>
<li>Our Services are not available to temporarily or indefinitely suspended members.</li>
<li>Our website reserves the right, in its sole discretion, to cancel unconfirmed or inactive accounts.</li>
</ul>
<ol>
<li>Our website reserves the right to refuse service to anyone, for any reason, at any time.</li>
<li>One individual can own only one account in his/her name.</li>
<li>You agree to comply with all local laws regarding online conduct and acceptable content. You are responsible for all applicable taxes. In addition, you must abide by our website&rsquo;s policies as stated in the Agreement and the website policy documents published on the Website as well as all other operating rules, policies and procedures that may be published from time to time on the Website by Company.</li>
<li><strong><u>SERVICES:</u></strong></li>
</ol>
<p>Our website provides a social networking platform wherein the users can post content, share their views, upload pictures, and connect with their peers, relatives, friends and other users.</p>
<ol start="6">
<li><strong><u>REWARD PROGRAM</u></strong></li>
</ol>
<p>Our website has a reward program &ldquo;BUZZARD&rdquo; which encourages creation of original content. In order to participate in the Reward Program, you will have to make certain payments in the manner as listed on the website to uniquely identify you in case you become eligible for reward. Every one is auto enrolled in the reward programs and no payment is required until user desired to claim the reward.</p>
<ol start="7">
<li><strong><u>PAYMENTS</u></strong>
<ol>
<li>There are various services on the website which are paid and in order to make such payments the users will have to pay through their credit cards or PayPal. We dot store credit card or any other information for anonymous donations.</li>
<li>Our website uses third party payment providers to receive payments from users. We are not responsible for delays or erroneous transaction execution or cancellation of orders due to payment issues.</li>
</ol>
</li>
</ol>
<ul>
<li>We take utmost care to work with 3rd party payment providers, but do not control their systems, processes, technology and work flows, hence cannot be held responsible for any fault at the end of payment providers.</li>
</ul>
<ol>
<li>Our website reserves the right to refuse to process transactions by users with a prior history of questionable charges including without limitation breach of any agreements us or breach/violation of any law or breach of any policy.</li>
<li>The users acknowledge that we will not be liable for any damages, interests or claims etc. resulting from not processing a Transaction/Transaction Price or any delay in processing a Transaction/Transaction Price which is beyond our control.</li>
<li>Our website reserves the right to recover the cost of services, collection charges and lawyers' fees from persons using the Site fraudulently. We reserve the right to initiate legal proceedings against such persons for fraudulent use of the Site and any other unlawful act or acts or omissions in breach of these terms and conditions.</li>
</ol>
<ul>
<li>We as a merchant shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholde.</li>
</ul>
<ol start="8">
<li><strong><u>ACKNOWLEDGEMENTS/REPRESENTATIONS AND WARRANTIES BY USERS:</u></strong></li>
<li>Our website reserves the right to initiate civil and/or criminal proceedings against a user who, files an invalid and/or false claim or provides false, incomplete, or misleading information. In addition to the legal proceedings as aforesaid, we may at our sole discretion suspend, block, restrict, cancel the user id of such user and/or disqualify that user from using our website. Any person who knowingly and with an intention to injure, defraud or deceive, files a Fraudulent Complaint containing false, incomplete, or misleading information shall be guilty of a criminal offence and will be prosecuted fully of the law.</li>
<li>Our website shall not be responsible for any loss of your posts due to crash in the server and accordingly you losing upon any reward in the Reward Program. We shall not be liable to pay you back any entry fees, if your posts are lost due to the crashing of the servers and you losing upon an opportunity to win a reward.</li>
<li><strong><u>YOU AGREE AND CONFIRM:</u></strong></li>
<li>That you will use the services provided by our website, its affiliates and contracted companies, for lawful purposes only and comply with all applicable laws and regulations while using the Site and transacting on the Site.</li>
<li>You will provide authentic and true information in all instances where such information is requested of you. We reserve the right to confirm and validate the information and other details provided by you at any point of time. If upon confirmation your details are found not to be true (wholly or partly), we have the right in our sole discretion to reject the registration and debar you from using the Services of our website and / or other affiliated websites without prior intimation whatsoever.</li>
</ol>
<ul>
<li>That you are accessing the services available on this Site and transacting at your sole risk and are using your best and prudent judgment.</li>
</ul>
<ol>
<li>It is possible those other users (including unauthorized/unregistered users or "hackers") may post or transmit offensive or obscene materials on the Website and that you may be involuntarily exposed to such offensive and obscene materials. It also is possible for others to obtain personal information about you due to your use of the website, and that the recipient may use such information to harass or injure you. We do not approve of such unauthorized uses, but by using the website you acknowledge and agree that we are not responsible for the use of any personal information that you publicly disclose or share with others on the website. Please carefully select the type of information that you publicly disclose or share with others on the Website.</li>
<li>You agree that you shall not create automated computer accounts and the Company shall have the right to immediately delete such accounts on discovering them and the Company shall in its sole discretion penalize you for the same.</li>
</ol>
<ol start="10">
<li><strong><u>YOU MAY NOT USE THE SITE FOR ANY OF THE FOLLOWING PURPOSES:</u></strong></li>
<li>Disseminating any unlawful, pornographic, harassing, libelous, abusive, threatening, harmful, vulgar, obscene, or otherwise objectionable material.</li>
<li>Transmitting material that encourages conduct that constitutes a criminal offense, results in civil liability or otherwise breaches any relevant laws, regulations or code of practice.</li>
</ol>
<ul>
<li>Interfering with any other person's use or enjoyment of the Site.</li>
</ul>
<ol>
<li>Breaching any applicable laws;</li>
<li>Interfering or disrupting networks or web sites connected to the Site.</li>
<li>Making, transmitting or storing electronic copies of materials protected by copyright without the permission of the owner.</li>
</ol>
<ul>
<li>Without limiting other remedies, we may, in our sole discretion, limit, suspend, or terminate our services and user accounts, prohibit access to our sites, services, applications, and tools, and their content, delay or remove hosted content, and take technical and legal steps to keep users from using our sites, services, applications, or tools, if we think that they are creating problems or possible legal liabilities, infringing the intellectual property rights of third parties, or acting inconsistently with the letter or spirit of our policies. We also reserve the right to cancel unconfirmed accounts or accounts that have been inactive for a period of months, or to modify or discontinue our site, services</li>
</ul>
<ol start="11">
<li><strong><u>MODIFICATION OF TERMS &amp; CONDITIONS OF SERVICES: </u></strong></li>
<li>We may at any time modify the Terms &amp; Conditions of Use of the site without any prior notification to you. You can access the latest version of the User Agreement at any given time on our website. You should regularly review the Terms &amp; Conditions on our website. In the event the modified Terms &amp; Conditions is not acceptable to you, you should discontinue using the service. However, if you continue to use the service you shall be deemed to have agreed to accept and abide by the modified Terms &amp; Conditions of Use of this site.</li>
</ol>
<ol start="12">
<li><strong><u>REVIEWS, FEEDBACK, SUBMISSIONS</u></strong><strong><u>:</u></strong></li>
<li>All submissions disclosed, submitted or offered to us on or by this Site or otherwise disclosed, submitted or offered in connection with your use of this Site (collectively, the "Comments") shall be and remain our property. Such Comments shall constitute an assignment to us of all worldwide rights, titles and interests in all copyrights and other intellectual properties in the Comments. Thus, we exclusively own all such rights, titles and interests and shall not be limited in any way in its use, commercial or otherwise, of any Comments. We will be entitled to use, reproduce, disclose, modify, adapt, create derivative works from, publish, display and distribute any Comments you submit for any purpose whatsoever, without restriction and without compensating you in any way.</li>
<li>We are and shall be under no obligation (1) to maintain any Comments in confidence; (2) to pay you any compensation for any Comments; or (3) to respond to any Comments. You agree that any Comments submitted by you to the Site will not violate this policy or any right of any third party, including copyright, trademark, privacy or other personal or proprietary right(s), and will not cause injury to any person or entity. You further agree that no Comments submitted by you to the Site will be or contain libelous or otherwise unlawful, threatening, abusive or obscene material, or contain software viruses, commercial solicitation, chain letters, mass mailings or any form of "spam".</li>
</ol>
<ul>
<li>Our website does not regularly review posted Comments, but does reserve the right (but not the obligation) to monitor and edit or remove any Comments submitted to the Site. You grant us the right to use the name that you submit in connection with any Comments. You agree not to use a false email address, impersonate any person or entity, or otherwise mislead as to the origin of any Comments you submit. You are and shall remain solely responsible for the content of any Comments you make and you agree to indemnify us and our affiliates for all claims resulting from any Comments you submit. We and our affiliates take no responsibility and assume no liability for any Comments submitted by you or any third party.</li>
</ul>
<ol start="13">
<li><strong><u>CONTENT ON THE SERVICES </u></strong></li>
</ol>
<p>You are responsible for your use of the Services and for any Content you provide, including compliance with applicable laws, rules, and regulations. You should only provide Content that you are comfortable sharing with others. Any use or reliance on any Content or materials posted via the Services or obtained by you through the Services is at your own risk. We do not endorse, support, represent or guarantee the completeness, truthfulness, accuracy, or reliability of any Content or communications posted via the Services or endorse any opinions expressed via the Services. You understand that by using the Services, you may be exposed to Content that might be offensive, harmful, inaccurate or otherwise inappropriate, or in some cases, postings that have been mislabeled or are otherwise deceptive. All Content is the sole responsibility of the person who originated such Content. We may not monitor or control the Content posted via the Services and, we cannot take responsibility for such Content. We reserve the right to remove Content that violates the User Agreement, including for example, copyright or trademark violations, impersonation, unlawful conduct, pornography, or harassment.</p>
<ol start="14">
<li><strong><u>YOUR RIGHTS AND GRANT OF RIGHTS IN THE CONTENT </u></strong></li>
<li>You retain your rights to any Content you submit, post or display on or through the Services. By submitting, posting or displaying Content on or through the Services, you grant us a worldwide, non-exclusive, royalty-free license (with the right to sublicense) to use, copy, reproduce, process, adapt, modify, publish, transmit, display and distribute such Content in any and all media or distribution methods (now known or later developed). This license authorizes us to make your Content available to the rest of the world and to let others do the same. You agree that this license includes the right for Website to provide, promote, and improve the Services and to make Content submitted to or through the Services available to other companies, organizations or individuals for the syndication, broadcast, distribution, promotion or publication of such Content on other media and services, subject to our terms and conditions for such Content use. Such additional uses by Website, or other companies, organizations or individuals, may be made with no compensation paid to you with respect to the Content that you submit, post, transmit or otherwise make available through the Services.</li>
<li>You represent and warrant that you have, or have obtained, all rights, licenses, consents, permissions, power and/or authority necessary to grant the rights granted herein for any Content that you submit, post or display on or through the Services. You agree that such Content will not contain material subject to copyright or other proprietary rights, unless you have necessary permission or are otherwise legally entitled to post the material and to grant Website the license described above.</li>
<li><strong><u>COPYRIGHT &amp; TRADEMARK</u></strong><strong><u>:</u></strong></li>
<li>Our website, its suppliers and licensors expressly reserve all intellectual property rights in all text, programs, products, processes, technology, content and other materials, which appear on this Site. Access to this Site does not confer and shall not be considered as conferring upon anyone any license under any or any third party's intellectual property rights. All rights, including copyright, in this website are owned by or licensed to us or third party suppliers. Any use of this website or its contents, including copying or storing it or them in whole or part, other than for your own personal, non-commercial use is prohibited without the permission of our website. You cannot modify, distribute or re-post anything on this website for any purpose.</li>
<li>Names and logos and all related product and service and our slogans are the trademarks or service marks of K. T. LLC. All other marks are the property of their respective companies. No trademark or service mark license is granted in connection with the materials contained on this Site. Access to this Site does not authorize anyone to use any name, logo or mark in any manner.</li>
</ol>
<ul>
<li>All materials, including images, text, illustrations, designs, icons, photographs, programs, music clips or downloads, video clips and written and other materials that are part of this Site (collectively, the "Contents") are intended solely for personal, non-commercial use. You may download or copy the Contents and other downloadable materials displayed on the Site for your personal use only. No right, title or interest in any downloaded materials or software is transferred to you as a result of any such downloading or copying. You may not reproduce (except as noted above), publish, transmit, distribute, display, modify, create derivative works from, sell or participate in any sale of or exploit in any way, in whole or in part, any of the Contents, the Site or any related software. All software used on this Site is the property of our website or its suppliers and protected by laws of United States of America. Any other use, including the reproduction, modification, distribution, transmission, republication, display, or performance, of the Contents on this Site is strictly prohibited. Unless otherwise noted, all Contents are copyrights, trademarks and/or other intellectual property owned, controlled or licensed by our website, one of its affiliates or by third parties who have licensed their materials to us and are protected by laws of United States of America. The compilation (meaning the collection, arrangement, and assembly) of all Contents on this Site is the exclusive property of our website and is also protected by laws of United States of America.</li>
</ul>
<ol>
<li>If you learn of any unlawful material or activity on our website, or any material or activity that breaches this notice, please inform us. We respect the intellectual property rights of others and expect users of the Services to do the same. We will respond to notices of alleged copyright infringement that comply with applicable law and are promptly and properly provided to us. If you have a reason to believe that Your Content has been copied in a way that constitutes copyright infringement, please provide us with the following information:</li>
<li>a physical or electronic signature of the copyright owner or a person authorized to act on their behalf;</li>
<li>identification of the copyrighted work claimed to have been infringed;</li>
<li>identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit us to locate the material;</li>
<li>Your contact information, including your address, telephone number and an email address;</li>
<li>a statement by you that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law; and</li>
<li>a statement that the information in the notification is accurate, and that You are authorized to act on behalf of the copyright owner.</li>
<li>We have the right to remove the Content alleged to be infringing without prior notice, at our sole discretion, and without liability to you. In appropriate circumstances, we will also terminate a user&rsquo;s account if we determine that the user is a repeat infringer.</li>
<li>Notices regarding our website should be sent to: customerservice2fa@gmail.com.</li>
</ol>
<ul>
<li>We respond to copyright&nbsp;complaints submitted under the Digital Millennium Copyright Act (&ldquo;DMCA&rdquo;). Section 512 of the DMCA outlines the statutory requirements necessary for formally reporting copyright infringement, as well as providing instructions on how an affected party can appeal a removal by submitting a compliant counter-notice. We will respond to reports of alleged copyright infringement, such as allegations concerning the unauthorized use of a copyrighted image as a profile or header photo, allegations concerning the unauthorized use of a copyrighted video or image uploaded through our media hosting services, or posts containing links to allegedly infringing materials.</li>
<li>Before submitting a copyright complaint to us, please consider whether the use could be considered fair use.</li>
</ul>
<ol>
<li>If you have considered fair use, and you still wish to continue with a copyright complaint, you may want to first reach out to the user in question to see if you can resolve the matter directly with the user. You can reply to the user&rsquo;s Buzz and ask for them to remove your copyrighted content without having to contact the website.</li>
<li>Prior to submitting a formal complaint with the website, please be aware that under 17 U.S.C. &sect; 512(f), you may be liable for any damages, including costs and attorneys&rsquo; fees incurred by us or our users, if you knowingly materially misrepresent that material or activity is infringing. If you are unsure whether the material you are reporting is in fact infringing, you may wish to contact an attorney before filing a notification with us.</li>
<li>To submit a notice of claimed copyright infringement, you will need to provide us with the following information:</li>
<li>A physical or electronic signature (typing your full name will suffice) of the copyright owner or a person authorized to act on their behalf;</li>
<li>Identification of the copyrighted work claimed to have been infringed (e.g., a link to original work and clear description of the materials allegedly being infringed upon);</li>
<li>Identification of the infringing material and information reasonably sufficient to permit website to locate the material on our website or services;</li>
<li>Your contact information, including your address, telephone number, and an email address;</li>
<li>A statement that you have a good faith belief that the use of the material in the manner asserted is not authorized by the copyright owner, its agent, or the law; and</li>
<li>A statement that the information in the complaint is accurate, and, under penalty of perjury, that you are authorized to act on behalf of the copyright owner.</li>
</ol>
<ul>
<li>You can file copyright complaint by writing to us at customerservice2fa@gmail.com.</li>
</ul>
<ol start="16">
<li><strong><u>INDEMNITY</u></strong><strong><u>:</u></strong></li>
</ol>
<p>You agree to defend, indemnify and hold harmless our Company/website, its employees, directors, officers, agents and their successors and assigns from and against any and all claims, liabilities, damages, losses, costs and expenses, including attorney's fees, caused by or arising out of claims based upon your actions or inactions, which may result in any loss or liability to our website or any third party including but not limited to breach of any warranties, representations or undertakings or in relation to the non-fulfillment of any of your obligations under this User Agreement or arising out of your violation of any applicable laws, regulations including but not limited to Intellectual Property Rights, payment of statutory dues and taxes, claim of libel, defamation, violation of rights of privacy or publicity, loss of service by other subscribers and infringement of intellectual property or other rights. This clause shall survive the expiry or termination of this User Agreement.</p>
<ol start="17">
<li><strong><u>TERMINATION</u></strong><strong><u>:</u></strong></li>
<li>We may, at any time and without notice, suspend, cancel, or terminate your right to use the website (or any portion of the website). In the event of suspension, cancellation, or termination, you are no longer authorized to access the part of the website affected by such suspension, cancellation, or termination. In the event of any suspension, cancellation, or termination, the restrictions imposed on you with respect to material downloaded from the website and the disclaimers and limitations of liabilities set forth in the Agreement, shall survive.</li>
<li>Without limiting the foregoing, we may close, suspend or limit your access to our website:</li>
</ol>
<ul>
<li>if we determine that you have breached, or are acting in breach of, this Agreement;</li>
<li>if we determine that you have breached legal liabilities (actual or potential), including infringing someone else's Intellectual Property Rights;</li>
<li>if we determine that you have engaged, or are engaging, in fraudulent, or illegal activities;</li>
<li>to manage any risk of loss to us, a User, or any other person; or</li>
<li>For other similar reasons.</li>
<li>If we find you breaching these terms of service, you may also become liable for an amount of which we have suffered losses/damages.</li>
</ul>
<ol start="18">
<li><strong><u>DISCLAIMERS AND LIMITATION OF LIABILITY</u></strong><strong><u>:</u></strong></li>
<li>The Site is provided without any warranties or guarantees and in an "As Is" condition. You must bear the risks associated with the use of the Site.</li>
<li>The Site provides content from other Internet sites or resources and while our website tries to ensure that material included on the Site is correct, reputable and of high quality, it shall not accept responsibility if this is not the case. We will not be responsible for any errors or omissions or for the results obtained from the use of such information or for any technical problems you may experience with the Site. This disclaimer constitutes an essential part of this User Agreement. In addition, to the extent permitted by applicable law, we are not liable, and you agree not to hold Company responsible, for any damages or losses (including, but not limited to, loss of money, goodwill or reputation, profits, or other intangible losses or any special, indirect, or consequential damages) resulting directly or indirectly from:</li>
</ol>
<ul>
<li>Your use of or your inability to use our Website, Services and tools;</li>
<li>Delays or disruptions in our Website, Services, or tools;</li>
<li>Viruses or other malicious software obtained by accessing our Website, Services, or tools or any site, Services, or tool linked to our Website, Services, or tools;</li>
<li>Glitches, bugs, errors, or inaccuracies of any kind in our Website, Services, and tools or in the information and graphics obtained from them;</li>
<li>The content, actions, or inactions of third parties, including items listed using our Website, services, or tools or the destruction of allegedly fake items;</li>
<li>A suspension or other action taken with respect to your account; and</li>
<li>To the fullest extent permitted under applicable law, our website or its suppliers shall not be liable for any indirect, incidental, special, consequential or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data or other intangible losses arising out of or in connection with the Site, its services or this User Agreement. Without prejudice to the generality of the section above, the total liability of our website to you for all liabilities arising out of this user.</li>
</ul>
<ol>
<li>Our website, its associates and technology partners make no representations or warranties about the accuracy, reliability, completeness, correctness and/or timeliness of any content, information, software, text, graphics, links or communications provided on or through the use of the Site or that the operation of the Site will be error free and/or uninterrupted. Consequently, our website assumes no liability whatsoever for any monetary or other damage suffered by you on account of the delay, failure, interruption, or corruption of any data or other information transmitted in connection with use of the Site; and/or any interruption or errors in the operation of the Site.</li>
<li>Our website periodically schedules system downtime for the Sites for maintenance and other purposes. Unplanned system outages also may occur. You agree that we have no responsibility and is not liable for: (a) the unavailability of any of the Sites; (b) any loss of data, information or materials caused by such system outages; (c) the resultant delay, missdelivery, non-delivery of data or corruption of data, information or materials caused by such system outages; or (d) any outages caused by any third parties, including without limitation any companies or servers hosting any of the Sites, any Internet service providers or otherwise.</li>
<li><strong><u>GOVERNING LAWS AND JURISDICTION</u></strong><u>:</u></li>
<li>This User Agreement shall be construed in accord with the applicable laws of United States of America regardless of your physical location.</li>
<li>The Courts at Montgomery County, TX have exclusive jurisdiction in any proceedings arising out of this agreement.</li>
</ol>
<ul>
<li>The maximum payout from any litigation or arbitration is capped at $0.01 which covers attorney fees and any other expenses.</li>
</ul>
<ol start="20">
<li><strong><u>DISPUTE RESOLUTION:</u></strong></li>
<li>A 'Dispute' can be defined as a disagreement between you and us on the Website.</li>
<li>In the interest of resolving disputes between you and us in the most expedient and cost effective manner, you and we agree that any and all disputes arising in connection with the Terms shall be resolved by binding arbitration. Arbitration is more informal than a lawsuit in court. Arbitration uses a neutral arbitrator instead of a judge or jury, may allow for more limited discovery than in court, and can be subject to very limited review by courts. Arbitrators can award the same damages and relief that a court can award. Our agreement to arbitrate disputes includes, but is not limited to all claims arising out of or relating to any aspect of the Terms, whether based in contract, tort, statute, fraud, misrepresentation or any other legal theory, and regardless of whether the claims arise during or after the termination of the Terms. YOU UNDERSTAND AND AGREE THAT, BY ENTERING INTO THE TERMS, YOU AND WE ARE EACH WAIVING THE RIGHT TO A TRIAL BY JURY OR TO PARTICIPATE IN A CLASS ACTION.</li>
</ol>
<ul>
<li>The venue for arbitration shall be United States of America and the seat of Arbitration shall be located in Montgomery County, TX and the language used for arbitration shall be English.</li>
</ul>
<ol>
<li>The award of the arbitration shall be binding on both, you and us.</li>
<li>The suits which are impliedly or specifically barred by this agreement shall be opposed by us by pleading this agreement.</li>
<li>In no case shall you claim from the Company as an arbitral award an amount more than dollar 0.01 ($0.01) including all expenses.</li>
<li><strong><u>SITE SECURITY</u></strong><strong><u>:</u></strong></li>
</ol>
<p>You are prohibited from violating or attempting to violate the security of the Site, including, without limitation, (a) accessing data not intended for you or logging onto a server or an account which you are not authorized to access; (b) attempting to probe, scan or test the vulnerability of a system or network or to breach security or authentication measures without proper authorization; (c) attempting to interfere with service to any other user, host or network, including, without limitation, via means of submitting a virus to the Site, overloading, "flooding," "spamming," "mail-bombing" or "crashing;" (d) sending unsolicited email, including promotions and/or advertising of products or services; or (e) forging any TCP/IP packet header or any part of the header information in any email or newsgroup posting. Violations of system or network security may result in civil or criminal liability. We will investigate occurrences that may involve such violations and may involve, and cooperate with, law enforcement authorities in prosecuting users who are involved in such violations. You agree not to use any device, software or routine to interfere or attempt to interfere with the proper working of this Site or any activity being conducted on this Site. You agree, further, not to use or attempt to use any engine, software, tool, agent or other device or mechanism (including without limitation browsers, spiders, robots, avatars or intelligent agents) to navigate or search this Site other than the search engine and search agents available from us on this Site and other than generally available third party web browsers (e.g., Netscape Navigator, Microsoft Explorer).</p>
<ol start="22">
<li><strong><u>PRIVACY</u></strong></li>
</ol>
<p>All Personal Information and User Generated Content provided to or displayed on the Site and Services are subject to our Privacy Statement.</p>
<ol start="23">
<li><strong><u>NOTICE</u></strong></li>
<li>By using the Site and Services, you accept that communication with us will be mainly electronic. We will contact you by email or provide you with information by posting notices on the Site and Services.</li>
<li>You acknowledge that all contracts, notices, information and other communication we may provide electronically comply with any legal requirements that such documents are in writing.</li>
</ol>
<ul>
<li>Notice will be deemed received and properly served immediately when posted on the Site and Services, 24 hours after an email is sent, or 3 days after the date of posting any letter. As proof of service, it is sufficient that:</li>
<li>For letters, the letter was properly addressed, stamped and placed in the post; and</li>
<li>For emails, the email was sent to the specified email address.</li>
</ul>
<ol start="24">
<li><strong><u>LEGAL COMPLIANCE</u></strong></li>
<li>In addition to this Agreement, you must familiarize yourself with, and comply with the Policies, domestic laws (including common law), state legislation, international laws, statutes, ordinances and regulations regarding your use of our services. Notwithstanding successful conclusion of a transaction you must ensure strict compliance with any particular formalities which, if not complied with, will either render a transaction void or unlawful.&nbsp;</li>
<li>You alone, and not we, are responsible for ensuring that the services and any other activities conducted on the website are lawful. You must ensure that they comply with all applicable laws in United States of America and all other countries.</li>
</ol>
<ul>
<li>You should comply with country, state and federal regulations.</li>
</ul>
<ol start="25">
<li><strong><u>LINKS TO OTHER WEBSITES:</u></strong></li>
</ol>
<p>Links to third party Websites on this site are provided solely as a convenience to you. If you use these links, a new browser will be lodged to access linked Websites. We have not reviewed these third party Websites and does not control and is not responsible for any of these Websites or their content. We do not endorse or make any representations about them, or any information, or other products or materials found there, or any results that may be obtained from using them. If you decide to access any of the third party Websites linked to this site, you do this entirely at your own risks.</p>
<ol start="26">
<li><strong><u>NO WAIVER IMPLIED:</u></strong></li>
</ol>
<p>The failure of us to enforce at any time any of the provisions of these of Agreement, or the failure to require at any time performance by you of any of the provisions of these provisions, shall in no way be construed to be a present or future waiver of such provisions, nor in any way affect the our right to enforce each and every such provision thereafter. The express waiver by us of any provision, condition or requirement of these provisions shall not constitute a waiver of any future obligation to comply with such provision, condition or requirement.</p>
<ol start="27">
<li><strong><u>SEVERABILITY:</u></strong></li>
</ol>
<p>Each Term shall be deemed to be severable. If any Term or portion thereof is found to be invalid or unenforceable, such invalidity or unenforceability shall in no way effect the validity or enforceability of any other Term.</p>
<ol start="28">
<li><strong><u>ASSIGNMENT:</u></strong></li>
<li>You will not assign any rights or delegate any obligations under these Terms, in whole or in part, by operation of law or otherwise, without obtaining our prior written consent, which may be withheld in our sole discretion.</li>
<li>We may assign our rights and delegate any of our obligations under these Terms, in whole or in part, without your consent. Any assignment or delegation in violation of the foregoing will be null and void. These Terms will be binding and inure to the benefit of each party&rsquo;s permitted successors and assigns.</li>
<li><strong><u>FORCE MAJEURE:</u></strong></li>
</ol>
<p>We shall be under no liability to you in respect of anything that, if not for this provision, would or might constitute a breach of these Terms, where this arises out of circumstances beyond our control, including but not limited to:</p>
<p>(a) acts of god;</p>
<p>(b) natural disasters;</p>
<p>(c) sabotage;</p>
<p>(d) accident;</p>
<p>(e) riot;</p>
<p>(f) shortage of supplies, equipment, and materials;</p>
<p>(g) strikes and lockouts;</p>
<p>(h) civil unrest;</p>
<p>(i) Computer hacking; or</p>
<p>(j) malicious damage.</p>
<ol start="30">
<li><strong><u>DIGITAL SIGNATURE:</u></strong></li>
<li>By using our services, you are deemed to have executed this Agreement electronically; effective on the date you register your Account and start using our services. Your Account registration constitutes an acknowledgement that you are able to electronically receive, downloads, and prints this Agreement.</li>
<li>In connection with this Agreement, you may be entitled to receive certain records, such as contracts, notices, and communications, in writing. To facilitate your use of the website, you give us permission to provide these records to you electronically instead of in paper form.</li>
</ol>
<ul>
<li>By registering for an Account, you consent to electronically receive and access, via email, all records and notices for the services provided to you under this Agreement that we would otherwise be required to provide to you in paper form. However, we reserve the right, in our sole discretion, to communicate with you via email address under which your account is registered. Your consent to receive records and notices electronically will remain in effect until you withdraw it. You may withdraw your consent to receive further records and notices electronically at any time by contacting Customer Support. If you withdraw your consent to receive such records and notices electronically, we will terminate your access to the Services, and you will no longer be able to use the Services. Any withdrawal of your consent to receive records and notices electronically will be effective only after we have a reasonable period of time to process your request for withdrawal. Please note that your withdrawal of consent to receive records and notices electronically will not apply to records and notices electronically provided by us to you before the withdrawal of your consent becomes effective.</li>
</ul>
<ol>
<li>In order to ensure that we are able to provide records and notices to you electronically, you must notify us of any change in your email address by updating your Account information on the website or by contacting Customer Support.</li>
<li><strong><u>ENTIRE AGREEMENT:</u></strong></li>
</ol>
<p>These Terms collectively represent the entire agreement and understanding between you and us and supersede any other agreement or understanding (written, oral or implied) that you and we may have had. Any statement, inducement, promise, covenant or condition not expressly found either in these Terms shall be deemed as void.</p>
<ol start="32">
<li><strong><u>CONTACT US:</u></strong></li>
</ol>
<p>For any further clarification of out Terms and Conditions, please write to us at customerservice2fa@gmail.com.</p>
<ol start="33">
<li><strong><u>LIMITATION OF LIABILITY: </u></strong></li>
</ol>
<p>In no event shall the aggregate liability exceed greater than US $0.01</p>

<p><strong><u>Buzzard </u></strong></p>
<p>These are rewards instituted to promote the website and its features. First 50 users with 1,000 (one thousand) likes of their content will receive $1,000 reward each for total buzzard of $50,000.</p>
<p>To be eligible for buzzards, create great content and contact us when your post reaches 1,000 likes.</p>
<p>In addition, following criteria must be fulfilled to be eligible for Buzzards:</p>

<ol>
<li>The posts must be original content and should adhere to the standards mentioned in Terms and Conditions</li>
<li>User must be at least 13 years of age to participate</li>
<li>Likes must happen during life of Buzzs which currently is set at 1 year</li>
<li>After 1 year, Buzzs auto-delete and hence the Buzz is no longer eligible for participation in rewards</li>
<li>Buzz must come from verified users</li>
<li>Likes must come from verified users</li>
<li>To become a verified user, user must pay $1.49 through PayPal or Credit Card for administration and awardee identification purposes. Part of the fee covers the cost of payment services ($.30 per transaction is taken by payment service provider), hosting cost, development cost, etc.</li>
<li>Additionally to become verified user donate $100 to your favorite cause. We will keep $1.99 as processing charges.</li>
<li>After first and subsequent rewards, the likes must come from users who have not previously liked an already rewarded Buzz i.e. if user A has liked an already rewarded Buzz, he is eligible to participate in rewards by creating great content but his likes is not an eligible count towards any future rewards</li>
<li>Any user is eligible to participate with multiple posts. So, single content creator can win up to $50,000 in rewards by creating 50 great content</li>
<li>Buzzs eligible for buzzard must not repeat the theme or, plagiarize an existing liked Buzz</li>
<li>The winner will be notified by email and they agree to participate in marketing activities for BuzzRaker</li>
<li>In case of tie for the 50<sup>th</sup> reward, reward will be distributed evenly among the winners</li>
<li>All decisions made by BuzzRaker and it&rsquo;s affiliates is binding and non negotiable and non-suable in any court</li>
<li>Account verification fee is non-refundable</li>
<li>The results are final and there will be no correspondence regarding challenges to outcome of the results.</li>
<li>Additional government issued identification like Drivers License and/or Passport, etc. will be required for collecting rewards and tax filing purposes. </li>
<li>Rewards will be photographed and can be used for promotion activities by www.BuzzRaker.com.</li>
<li>Failure to comply with any of the rules or any effort to game the process will result in the disqualification of the entry</li>
</ol>

<p>Please encourage family and friends to join, and create great content.</p>
        </div>
      </Dialog>
    </div>
  );
}


