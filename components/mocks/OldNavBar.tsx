/**
 * The pre-0.7 navigation bar, reconstructed.
 *
 * The app repo has no archived screenshot of the old home screen, so the flat,
 * edge-to-edge `NavigationBar` from the 0.4/0.5 theme is rebuilt from the shape
 * that theme produced: a flush bottom bar, five evenly-split outlined icons,
 * a label only under the selected item, and no blur. Used solely as the "before"
 * side of the comparison slider, and labelled as a reconstruction in the copy.
 */
export function MockOldNavBar() {
  const items = [
    { id: "home", label: "Home", path: "M3 10.5 12 3l9 7.5M5.5 9.5V20h13V9.5" },
    { id: "activity", label: "Activity", path: "M4 7h16M4 12h16M4 17h10" },
    { id: "reports", label: "Reports", path: "M4 20V9m5 11V4m5 16v-7m5 7V7" },
    { id: "budget", label: "Budget", path: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4.5v9m-4-4.5h8" },
    { id: "settings", label: "Settings", path: "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" },
  ];

  return (
    <span className="mt-auto flex w-full items-stretch border-t border-outline-variant bg-surface-container pt-1.5 pb-2">
      {items.map((item) => {
        const active = item.id === "home";
        return (
          <span key={item.id} className="flex flex-1 flex-col items-center gap-0.5">
            <svg
              viewBox="0 0 24 24"
              className={`size-5 ${active ? "text-primary" : "text-on-surface-variant"}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={active ? 2.6 : 1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d={item.path} />
            </svg>
            <span
              className={`text-[0.55rem] font-semibold ${active ? "text-primary" : "text-on-surface-variant"}`}
            >
              {active ? item.label : ""}
            </span>
          </span>
        );
      })}
    </span>
  );
}