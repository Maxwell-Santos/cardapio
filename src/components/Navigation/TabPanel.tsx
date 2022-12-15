interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function TabPanel(props: TabPanelProps) {
  const { index, children, value } = props;

  return (
    <ul
      role="tabpanel"
      // hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index && (
        <li>
          {children}
        </li>
      )}
    </ul>
  );
}