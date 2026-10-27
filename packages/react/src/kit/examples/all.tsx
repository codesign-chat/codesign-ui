import {
  Alert,
  AlertDescription,
  AlertTitle,
  AvatarGroup,
  AvatarGroupItem,
  Badge,
  Breadcrumb,
  BreadcrumbCurrent,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  Button,
  ButtonGroup,
  ButtonGroupItem,
  ButtonLabel,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Chip,
  ChipLabel,
  ChipRemoveTrigger,
  CommandPalette,
  CommandPaletteInput,
  CommandPaletteItem,
  CommandPaletteList,
  Descriptions,
  DescriptionsItem,
  DescriptionsLabel,
  DescriptionsValue,
  EmptyState,
  EmptyStateAction,
  EmptyStateTitle,
  FabIcon,
  FabRoot,
  IconButton,
  IconButtonIcon,
  Input,
  KpiDelta,
  KpiLabel,
  KpiRoot,
  KpiValue,
  Link,
  ListItem,
  ListItemContent,
  ListItemDescription,
  ListItemTitle,
  ListItemTrailing,
  MaskedInput,
  MiniCalendar,
  MiniCalendarDay,
  MiniCalendarGrid,
  NavItem,
  NavItemIcon,
  NavItemLabel,
  Notification,
  NotificationCloseTrigger,
  NotificationTitle,
  Popconfirm,
  PopconfirmActions,
  PopconfirmContent,
  PopconfirmTitle,
  PopconfirmTrigger,
  Search,
  SearchClearTrigger,
  SearchIcon,
  SearchInput,
  Sheet,
  SheetBody,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Skeleton,
  Spin,
  SpinIndicator,
  SpinLabel,
  SplitButton,
  SplitButtonAction,
  SplitButtonTrigger,
  StatusText,
  StatusTextIndicator,
  TabBand,
  TabBandItem,
  TabBandList,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableRowCell,
  TableState,
  TableStateDescription,
  TableStateTitle,
  Textarea,
  TimePicker,
  TimePickerInput,
  TimePickerTrigger,
  Timeline,
  TimelineContent,
  TimelineIndicator,
  TimelineItem,
  Transfer,
  TransferActions,
  TransferItem,
  TransferList,
  TransferPanel,
} from '../index.ts'

export const All = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      gap: 16,
      padding: 24,
      background: '#FAF7F6',
      fontFamily: 'sans-serif',
      color: '#161616',
    }}
  >
    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        Button
      </h3>
      <Button>
        <ButtonLabel>Save</ButtonLabel>
      </Button>
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        IconButton
      </h3>
      <IconButton aria-label="Settings">
        <IconButtonIcon>⚙</IconButtonIcon>
      </IconButton>
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        ButtonGroup
      </h3>
      <ButtonGroup>
        <ButtonGroupItem>Day</ButtonGroupItem>
        <ButtonGroupItem>Week</ButtonGroupItem>
      </ButtonGroup>
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        SplitButton
      </h3>
      <SplitButton>
        <SplitButtonAction>Save</SplitButtonAction>
        <SplitButtonTrigger>▾</SplitButtonTrigger>
      </SplitButton>
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        FAB
      </h3>
      <FabRoot aria-label="Add">
        <FabIcon>+</FabIcon>
      </FabRoot>
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        Link
      </h3>
      <Link href="#">Docs</Link>
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        Input
      </h3>
      <Input placeholder="you@company.com" />
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        Textarea
      </h3>
      <Textarea placeholder="Brief" />
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        Search
      </h3>
      <Search>
        <SearchIcon>⌕</SearchIcon>
        <SearchInput placeholder="Search" />
        <SearchClearTrigger>×</SearchClearTrigger>
      </Search>
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        MaskedInput
      </h3>
      <MaskedInput placeholder="4242 4242" />
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        Transfer
      </h3>
      <Transfer>
        <TransferPanel>
          <TransferList>
            <TransferItem>Alpha</TransferItem>
          </TransferList>
        </TransferPanel>
        <TransferActions>→</TransferActions>
      </Transfer>
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        TimePicker
      </h3>
      <TimePicker>
        <TimePickerInput placeholder="09:30" />
        <TimePickerTrigger>▾</TimePickerTrigger>
      </TimePicker>
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        TableHeader
      </h3>
      <table>
        <TableHeader>
          <TableHeaderCell>Name</TableHeaderCell>
        </TableHeader>
      </table>
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        TableRow
      </h3>
      <table>
        <tbody>
          <TableRow>
            <TableRowCell>Ada</TableRowCell>
          </TableRow>
        </tbody>
      </table>
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        TableState
      </h3>
      <TableState>
        <TableStateTitle>No rows</TableStateTitle>
        <TableStateDescription>Try a filter</TableStateDescription>
      </TableState>
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        ListItem
      </h3>
      <ListItem>
        <ListItemContent>
          <ListItemTitle>Invoice</ListItemTitle>
          <ListItemDescription>Paid</ListItemDescription>
        </ListItemContent>
        <ListItemTrailing>›</ListItemTrailing>
      </ListItem>
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        Descriptions
      </h3>
      <Descriptions>
        <DescriptionsItem>
          <DescriptionsLabel>Status</DescriptionsLabel>
          <DescriptionsValue>Active</DescriptionsValue>
        </DescriptionsItem>
      </Descriptions>
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        Timeline
      </h3>
      <Timeline>
        <TimelineItem>
          <TimelineIndicator>•</TimelineIndicator>
          <TimelineContent>Shipped</TimelineContent>
        </TimelineItem>
      </Timeline>
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        MiniCalendar
      </h3>
      <MiniCalendar>
        <MiniCalendarGrid>
          <MiniCalendarDay>1</MiniCalendarDay>
          <MiniCalendarDay>2</MiniCalendarDay>
        </MiniCalendarGrid>
      </MiniCalendar>
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        Badge
      </h3>
      <Badge>New</Badge>
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        StatusText
      </h3>
      <StatusText>
        <StatusTextIndicator>●</StatusTextIndicator>Active
      </StatusText>
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        Chip
      </h3>
      <Chip>
        <ChipLabel>Design</ChipLabel>
        <ChipRemoveTrigger>×</ChipRemoveTrigger>
      </Chip>
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        AvatarGroup
      </h3>
      <AvatarGroup>
        <AvatarGroupItem>A</AvatarGroupItem>
        <AvatarGroupItem>B</AvatarGroupItem>
      </AvatarGroup>
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        Card
      </h3>
      <Card>
        <CardHeader>
          <CardTitle>Workspace</CardTitle>
          <CardDescription>Plan</CardDescription>
        </CardHeader>
        <CardContent>Body</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        KPI
      </h3>
      <KpiRoot>
        <KpiLabel>Revenue</KpiLabel>
        <KpiValue>$48k</KpiValue>
        <KpiDelta>+12%</KpiDelta>
      </KpiRoot>
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        Skeleton
      </h3>
      <Skeleton style={{ width: 160, height: 16, background: '#E0DDDB', borderRadius: 4 }} />
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        EmptyState
      </h3>
      <EmptyState>
        <EmptyStateTitle>No results</EmptyStateTitle>
        <EmptyStateAction>Clear</EmptyStateAction>
      </EmptyState>
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        NavItem
      </h3>
      <NavItem href="#">
        <NavItemIcon>◈</NavItemIcon>
        <NavItemLabel>Overview</NavItemLabel>
      </NavItem>
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        TabBand
      </h3>
      <TabBand>
        <TabBandList>
          <TabBandItem>One</TabBandItem>
          <TabBandItem>Two</TabBandItem>
        </TabBandList>
      </TabBand>
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        Breadcrumb
      </h3>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbCurrent>Docs</BreadcrumbCurrent>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        CommandPalette
      </h3>
      <CommandPalette>
        <CommandPaletteInput placeholder="Search commands" />
        <CommandPaletteList>
          <CommandPaletteItem>Open settings</CommandPaletteItem>
        </CommandPaletteList>
      </CommandPalette>
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        Alert
      </h3>
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Check settings</AlertDescription>
      </Alert>
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        Notification
      </h3>
      <Notification>
        <NotificationTitle>Saved</NotificationTitle>
        <NotificationCloseTrigger>×</NotificationCloseTrigger>
      </Notification>
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        Popconfirm
      </h3>
      <Popconfirm>
        <PopconfirmTrigger>Delete</PopconfirmTrigger>
        <PopconfirmContent>
          <PopconfirmTitle>Sure?</PopconfirmTitle>
          <PopconfirmActions>Cancel / OK</PopconfirmActions>
        </PopconfirmContent>
      </Popconfirm>
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        Spin
      </h3>
      <Spin>
        <SpinIndicator>◌</SpinIndicator>
        <SpinLabel>Loading</SpinLabel>
      </Spin>
    </section>

    <section style={{ border: '1px solid #E0DDDB', borderRadius: 12, padding: 12, minHeight: 96 }}>
      <h3
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          color: '#585858',
          margin: '0 0 8px',
        }}
      >
        Sheet
      </h3>
      <Sheet>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <SheetBody>Body</SheetBody>
        </SheetContent>
      </Sheet>
    </section>
  </div>
)
