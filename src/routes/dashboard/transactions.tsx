import { type TransactionItem, TransactionsTable } from "@/components/dashboard/transactions-table";
import { UserNav } from "@/components/user-nav";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/transactions")({
	component: RouteComponent
});

export const data: TransactionItem[] = [
	{
		id: "m5gr84i9",
		activity: "ChatGPT App Purchase",
		amount: 212,
		status: "completed",
		date: new Date("2025-06-30T16:35:23.000Z")
	},
	{
		id: "3u1reuv4",
		activity: "Coffebay Apple Pay",
		amount: 23,
		status: "processing",
		date: new Date("2025-06-29T18:15:03.000Z")
	},
	{
		id: "derv1ws0",
		activity: "Hotel Booking",
		amount: 280,
		status: "completed",
		date: new Date("2025-06-21T12:15:23.000Z")
	},
	{
		id: "bhqecj4p",
		activity: "Marjane Shopping",
		amount: 121,
		status: "failed",
		date: new Date("2025-06-20T10:55:03.000Z")
	},
	{
		id: "r38jdkei",
		activity: "Payment to Plumber (CashApp)",
		amount: 180,
		status: "failed",
		date: new Date("2025-06-19T09:20:14.000Z")
	},
	{
		id: "n20skela",
		activity: "Boulangerie du Coin - Morning Croissants",
		amount: 7.5,
		status: "completed",
		date: new Date("2025-06-18T07:44:00.000Z")
	},
	{
		id: "vwpl38tq",
		activity: "Oasis Gym Monthly Subscription",
		amount: 45,
		status: "processing",
		date: new Date("2025-06-16T15:00:00.000Z")
	},
	{
		id: "qpw73lsa",
		activity: "Mobile Top-Up (IAM 10GB)",
		amount: 20,
		status: "failed",
		date: new Date("2025-06-15T17:12:00.000Z")
	},
	{
		id: "xot8pld2",
		activity: "Taxi Payment via WalletPay",
		amount: 14.9,
		status: "completed",
		date: new Date("2025-06-14T22:33:01.000Z")
	},
	{
		id: "pm2q49we",
		activity: "Doctor Visit – Dr. Selma Benyahia",
		amount: 350,
		status: "completed",
		date: new Date("2025-06-13T10:00:00.000Z")
	},
	{
		id: "c9xm7al3",
		activity: "Failed Card Charge - Bookstore",
		amount: 92,
		status: "failed",
		date: new Date("2025-06-12T13:24:45.000Z")
	},
	{
		id: "a8r49ndp",
		activity: "Uber Ride - Late Night",
		amount: 31.2,
		status: "processing",
		date: new Date("2025-06-11T01:15:00.000Z")
	},
	{
		id: "jlrn08ma",
		activity: "eLearning Course – UX Design",
		amount: 75,
		status: "completed",
		date: new Date("2025-06-09T16:00:00.000Z")
	},
	{
		id: "nd38xkq1",
		activity: "Food Market – Weekend Groceries",
		amount: 168.45,
		status: "completed",
		date: new Date("2025-06-07T10:21:03.000Z")
	},
	{
		id: "uzv29apw",
		activity: "Electricity Bill – June",
		amount: 98.6,
		status: "processing",
		date: new Date("2025-06-06T08:10:00.000Z")
	},
	{
		id: "ol5kpzmv",
		activity: "GAMINGTOPUP - PSN Credits",
		amount: 50,
		status: "failed",
		date: new Date("2025-06-04T19:19:00.000Z")
	},
	{
		id: "yqnd30lq",
		activity: "Subscription - Notion AI Pro",
		amount: 10,
		status: "completed",
		date: new Date("2025-06-02T07:30:00.000Z")
	},
	{
		id: "zxlq27ns",
		activity: "Train Ticket to Rabat",
		amount: 79.99,
		status: "completed",
		date: new Date("2025-05-30T13:40:00.000Z")
	},
	{
		id: "fpq93klz",
		activity: "Failed Wire Transfer – Freelancer Payment",
		amount: 420,
		status: "failed",
		date: new Date("2025-05-29T09:00:00.000Z")
	},
	{
		id: "tgo28mea",
		activity: "Late Night Pizza – Uber Eats",
		amount: 37.8,
		status: "processing",
		date: new Date("2025-05-28T23:59:00.000Z")
	}
];

function RouteComponent() {
	const { queryClient, user } = Route.useRouteContext();

	return (
		<div className="flex h-full">
			<main className="flex-1 flex flex-col h-screen overflow-hidden">
				<header className="flex h-20 shrink-0 items-center gap-2 border-b pt-2 mb-4 bg-background z-20">
					<div className="flex flex-1 items-center gap-2">
						<div className="flex items-center justify-between gap-4 pl-7">
							<h1 className="text-2xl font-medium tracking-tight">Transactions</h1>
						</div>
					</div>
					<div className="flex ml-auto pr-7">
						{user && <UserNav user={user} queryClient={queryClient} />}
					</div>
				</header>
				<div className="flex-1 overflow-y-auto flex flex-col gap-4 mx-7 mb-4">
					<TransactionsTable data={data} />
				</div>
			</main>
		</div>
	);
}
