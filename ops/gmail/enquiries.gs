// Enquiry housekeeping for info@eazyaccess.org. Runs once a day in Google Apps Script (script.google.com),
// inside the owner's own Google account. Nothing leaves Google.
//
// 1. Labels new contact-form enquiries "Enquiries" (they arrive from enquiries@eazyaccess.org with the
//    subject "Enquiry: ...", see src/contact.js).
// 2. Keeps the privacy notice's promise: an enquiry thread whose LAST message is more than two years old
//    goes to the Bin (Gmail empties the Bin after 30 days). Threads also labelled "Clients" are never touched.
//
// Starts with DRY_RUN = true: it only counts what it would do. Read the log, then set DRY_RUN = false.
// Logs counts and thread ids only, never a subject, name or message (they hold enquiry details).

const DRY_RUN = true;
const ENQUIRY_LABEL = "Enquiries";
const KEEP_LABEL = "Clients";
const KEEP_YEARS = 2;

function dailyEnquiryHousekeeping() {
  const enquiries = GmailApp.getUserLabelByName(ENQUIRY_LABEL);
  if (!enquiries) throw new Error(`Label "${ENQUIRY_LABEL}" is missing`);

  // 1. Label new form enquiries.
  const fresh = GmailApp.search(`from:enquiries@eazyaccess.org subject:"Enquiry:" -label:${ENQUIRY_LABEL} newer_than:30d`);
  if (!DRY_RUN && fresh.length) enquiries.addToThreads(fresh);

  // 2. Bin enquiries whose last message is older than KEEP_YEARS. older_than matches threads with ANY old
  //    message, so each thread's last message date is checked before anything is binned.
  const cutoff = new Date();
  cutoff.setFullYear(cutoff.getFullYear() - KEEP_YEARS);
  const candidates = GmailApp.search(`label:${ENQUIRY_LABEL} -label:${KEEP_LABEL} older_than:${KEEP_YEARS}y`, 0, 100);
  const expired = candidates.filter((t) => t.getLastMessageDate() < cutoff
    && !t.getLabels().some((l) => l.getName() === KEEP_LABEL));
  if (!DRY_RUN) expired.forEach((t) => t.moveToTrash());

  console.log(JSON.stringify({
    dryRun: DRY_RUN, labelled: fresh.length, checked: candidates.length, binned: expired.length,
    binnedIds: expired.map((t) => t.getId()),
  }));
}

// Run once by hand to schedule the daily run (06:00 in the script's time zone).
function installDailyTrigger() {
  ScriptApp.getProjectTriggers().forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("dailyEnquiryHousekeeping").timeBased().everyDays(1).atHour(6).create();
}
