/* Returns the next open topic from content/topic-backlog.json, in order.

   The backlog exists because a topic needs a scope/YMYL safety judgment call
   (see each entry's "cautions" field) that shouldn't be made fresh, unattended,
   under time pressure, on every single automated run. Vetting happens once,
   here; the daily/scheduled run just consumes the queue in order.

   Usage:
     node tools/next-topic.js                 print the next open topic
     node tools/next-topic.js --mark-published <id>
     node tools/next-topic.js --mark-needs-review <id> "<reason>"
     node tools/next-topic.js --remaining      print how many are still open
*/

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BACKLOG = path.join(ROOT, 'content', 'topic-backlog.json');
const LOW_WATER_MARK = 3;

function load() {
  return JSON.parse(fs.readFileSync(BACKLOG, 'utf8'));
}

function save(list) {
  fs.writeFileSync(BACKLOG, JSON.stringify(list, null, 2) + '\n', 'utf8');
}

function main() {
  const args = process.argv.slice(2);
  const list = load();

  if (args.includes('--remaining')) {
    console.log(list.filter((t) => t.status === 'open').length);
    return;
  }

  if (args.includes('--mark-published')) {
    const id = args[args.indexOf('--mark-published') + 1];
    const t = list.find((x) => x.id === id);
    if (!t) { console.error('No topic with id: ' + id); process.exit(1); }
    t.status = 'published';
    t.publishedDate = new Date().toISOString().slice(0, 10);
    save(list);
    console.log('Marked published: ' + id);
    return;
  }

  if (args.includes('--mark-needs-review')) {
    const id = args[args.indexOf('--mark-needs-review') + 1];
    const reason = args[args.indexOf('--mark-needs-review') + 2] || '(no reason given)';
    const t = list.find((x) => x.id === id);
    if (!t) { console.error('No topic with id: ' + id); process.exit(1); }
    t.status = 'needs-review';
    t.reviewReason = reason;
    save(list);
    console.log('Marked needs-review: ' + id + ' — ' + reason);
    return;
  }

  const open = list.filter((t) => t.status === 'open');
  if (!open.length) {
    console.log(JSON.stringify({ topic: null, remaining: 0, message: 'Backlog is empty. Do not invent a new topic unattended — this needs a human scope/YMYL pass. Stop and notify Deepak to add more vetted topics to content/topic-backlog.json.' }));
    return;
  }

  const next = open[0];
  console.log(JSON.stringify({ topic: next, remaining: open.length }, null, 2));

  if (open.length <= LOW_WATER_MARK) {
    console.error('');
    console.error('NOTE: only ' + open.length + ' open topic(s) left in the backlog (low-water mark is ' + LOW_WATER_MARK + ').');
    console.error('Flag this in the next digest so Deepak knows to review and add more topics soon.');
  }
}

main();
