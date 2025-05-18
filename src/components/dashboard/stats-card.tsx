export function StatsCard() {
	return (
		<div className="grid grid-cols-2 min-[1200px]:grid-cols-4 gap-4">
			<div className="relative flex items-center p-5 border border-border rounded-xl text-xl font-semibold shadow-sm">
				Expenses
			</div>
			<div className="relative flex items-center p-5 border border-border rounded-xl text-xl font-semibold shadow-sm">
				Income
			</div>
			<div className="relative flex items-center p-5 border border-border rounded-xl text-xl font-semibold shadow-sm">
				Balance
			</div>
			<div className="relative flex items-center p-5 border border-border rounded-xl text-xl font-semibold shadow-sm">
				Savings
			</div>
		</div>
	);
}
