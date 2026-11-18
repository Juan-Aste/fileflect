import AdSlot from "./AdSlot";

// With an AdSense client id but no sidebar ad unit yet (site not approved),
// there is no ad to show: leave the column out so the content is centred.
// Without a client id (dev, CI) the dashed placeholder still marks the spot.
const showColumn = !process.env.NEXT_PUBLIC_ADSENSE_CLIENT || !!process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR;

/** Content with a sticky ad column on wide desktop screens only. */
export default function WithSidebarAd({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-7xl justify-center gap-8 px-4">
      <div className="min-w-0 max-w-4xl flex-1">{children}</div>
      {showColumn && (
        // ad-column: hidden by globals.css when the slot renders nothing (Pro).
        <div className="ad-column hidden w-[300px] shrink-0 pt-12 xl:block">
          <div className="sticky top-24">
            <AdSlot placement="sidebar" />
          </div>
        </div>
      )}
    </div>
  );
}
