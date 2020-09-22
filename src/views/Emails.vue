<template>
  <masonry-layout-c title="E-mails">
    <!-- E-mail to all users -->
    <masonry-layout-tile-c section="E-mail to all users">
      <form  @submit.prevent="sendEmailToAllUsers">
        <div class="mB-10">What E-mail do you want to send to all users?</div>
        <div class="form-group peers">
          <input
            type="text"
            class="form-control"
            id="send-all-subject"
            name="send-all-subject"
            placeholder="Enter Subject..."
            v-model="emailToAll.subject"
            required
          />
        </div>

        <div class="form-group peers">
          <input
            type="text"
            class="form-control"
            id="send-all-body"
            name="send-all-body"
            placeholder="Enter Message..."
            v-model="emailToAll.body"
            required
          />
        </div>

        <div class="form-group checkbox checkbox-success peers">
          <input
            type="checkbox"
            id="send-all-html"
            name="send-all-html"
            class="peer"
            v-model="emailToAll.html"
            required
          />
          <label for="stock-checkbox-strict" class="peers peer-greed js-sb ai-c mB-15">
            <span class="peer peer-greed">Is it an html style email message?</span>
          </label>
        </div>

        <button type="submit" class="btn btn-primary">Sent E-mails!</button>
      </form>
    </masonry-layout-tile-c>

    <!-- E-mail to specific users -->
    <masonry-layout-tile-c section="E-mail to specific users">
      <form  @submit.prevent="sendEmailToUsers">
        <div class="mB-10">What E-mail do you want to send to whom?</div>
        <div class="form-group peers">
          <input
            type="text"
            class="form-control"
            id="send-email-recipients"
            name="send-email-recipients"
            placeholder="Enter Names..."
            v-model="mailData.recipients"
            aria-describedby="recipients-help"
            required
          />
          <small id="recipients-help" class="form-text text-muted">
            Please seperate all moods with a comma (,) or there won't be seen as seperate.
          </small>
        </div>
        

        <div class="form-group peers">
          <input
            type="text"
            class="form-control"
            id="send-email-subject"
            name="send-email-subject"
            placeholder="Enter Subject..."
            v-model="mailData.subject"
            required
          />
        </div>

        <div class="form-group peers">
          <input
            type="text"
            class="form-control"
            id="send-email-body"
            name="send-email-body"
            placeholder="Enter Message..."
            v-model="mailData.body"
            required
          />
        </div>
        <b-form-file v-model="mailData.attachments" class="mt-3 mB-20" multiple plain
        ></b-form-file>

        <button type="submit" class="btn btn-primary">Sent E-mails!</button>
      </form>
    </masonry-layout-tile-c>

    <!-- Send Order Confirmation -->
    <masonry-layout-tile-c section="Send Order Confirmation">
      <form  @submit.prevent="sendOrderConfirmation">
        <div class="mB-10">Fill in an order ID</div>
        <div class="form-group peers">
          <input
            type="text"
            class="form-control"
            id="send-confirmation-id"
            name="send-confirmation-id"
            placeholder="Enter Order ID..."
            v-model="sendConfirmationId"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Send!</button>
      </form>
    </masonry-layout-tile-c>

    <!-- Send Download Links -->
    <masonry-layout-tile-c section="Send Download Links">
      <form  @submit.prevent="sendOrderDownloadLinks">
        <div class="mB-10">Fill in an order ID</div>
        <div class="form-group peers">
          <input
            type="text"
            class="form-control"
            id="send-download-link-id"
            name="send-download-link-id"
            placeholder="Enter Order ID..."
            v-model="sendDownloadLinksId"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Send!</button>
      </form>
    </masonry-layout-tile-c>

    <!-- Send License Agreement -->
    <masonry-layout-tile-c section="Send License Agreement">
      <form  @submit.prevent="sendOrderLicenseAgreement">
        <div class="mB-10">Fill in an order ID</div>
        <div class="form-group peers">
          <input
            type="text"
            class="form-control"
            id="send-license-agreement-id"
            name="send-license-agreement-id"
            placeholder="Enter Order ID..."
            v-model="sendLicenseAgreementId"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Send!</button>
      </form>
    </masonry-layout-tile-c>
  </masonry-layout-c>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MasonryLayoutC from "../components/MasonryLayout.vue";
import MasonryLayoutTileC from "../components/MasonryLayoutTile.vue";
import { EmailMessage, SendOrderConfirmationRequest, SendOrderDownloadLinksRequest, SendOrderLicenseAgreementsRequest } from "../generated/models/grpc/cms_pb";
import { Attachment, MailData } from "../generated/models/grpc/internal/mail_pb";
import { ContentManagementModule } from "../store/modules/cms";

interface Email {
  subject: string, 
  body: string,
  html: boolean,
}

interface MailDataResult {
  recipients: string,
  subject: string, 
  body: string,
  attachments: Array<File>
}

@Component({
  name: "Emails",
  components: {
    MasonryLayoutC,
    MasonryLayoutTileC
  }
})
export default class Emails extends Vue {
  protected sendConfirmationId: string = "";
  protected sendDownloadLinksId: string = "";
  protected sendLicenseAgreementId: string = "";

  emailToAll : Email = {
    subject: "",
    body: "",
    html: false
  }

  mailData: MailDataResult = {
    recipients: "",
    subject: "", 
    body: "",
    attachments: []
  }

  sendEmailToAllUsers() {
    // Build request 
    var request : EmailMessage = new EmailMessage();
    request.setSubject(this.emailToAll.subject);
    request.setBody(this.emailToAll.body);
    request.setHtml(this.emailToAll.html);

    // send request
    ContentManagementModule.sendEmailToAllUsers(request).then(
      (result) => {
        alert("Successfully sent");
      },
      (error) => {
        alert("Failed to sent");
      }
    );
  }

  sendEmailToUsers() {
    // Build request 
    var request : MailData = new MailData();

    request.setToList(this.mailData.recipients.split(","));
    request.setSubject(this.mailData.subject);
    request.setBody(this.mailData.body);

    request.setAttachmentsList(this.convertFilesToAttachments(this.mailData.attachments));

    // send request
    ContentManagementModule.sendEmail(request).then(
      (result) => {
        alert("Successfully sent");
      },
      (error) => {
        alert("Failed to sent");
      }
    );
  }

  sendOrderConfirmation() {
    // build request 
    var request : SendOrderConfirmationRequest = new SendOrderConfirmationRequest();
    request.setOrderId(this.sendConfirmationId);

    // send request
    ContentManagementModule.sendOrderConfirmation(request).then(
      (result) => {
        alert("Successfully sent");
      },
      (error) => {
        alert("Failed to sent");
      }
    );
  }

  sendOrderDownloadLinks() {
    // build request 
    var request : SendOrderDownloadLinksRequest = new SendOrderDownloadLinksRequest();
    request.setOrderId(this.sendDownloadLinksId);

    // send request
    ContentManagementModule.sendOrderDownloadLinks(request).then(
      (result) => {
        alert("Successfully sent");
      },
      (error) => {
        alert("Failed to sent");
      }
    );
  }

  sendOrderLicenseAgreement() {
    // build request 
    var request : SendOrderLicenseAgreementsRequest = new SendOrderLicenseAgreementsRequest();
    request.setOrderId(this.sendLicenseAgreementId);

    // send request
    ContentManagementModule.sendOrderLicenseAgreement(request).then(
      (result) => {
        alert("Successfully sent");
      },
      (error) => {
        alert("Failed to sent");
      }
    );
  }

  convertFilesToAttachments(files : File[]): Attachment[] {
    var attachments : Attachment[] = [];

    files.forEach((file) => {
      let attachment : Attachment = new Attachment()
      attachment.setFilename(file.name);
      
      file.arrayBuffer().then(
        (result) => {
          var array = new Uint8Array(result)
          attachment.setData(array);
        }
      )

      attachments.push(attachment);
    });

    return attachments;
  }
}
</script>
