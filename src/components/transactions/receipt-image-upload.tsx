import { Button } from "@/components/ui/button";
import {
	FileUpload,
	FileUploadDropzone,
	FileUploadItem,
	FileUploadItemDelete,
	FileUploadItemMetadata,
	FileUploadItemPreview,
	FileUploadItemProgress,
	FileUploadList,
	FileUploadTrigger
} from "@/components/ui/file-upload";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { parseReceiptFn } from "@/lib/functions/transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUpload, X } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
	files: z
		.array(z.custom<File>())
		.max(1, "Please select only one file")
		.refine((files) => files.every((file) => file.size <= 5 * 1024 * 1024), {
			message: "File size must be less than 5MB",
			path: ["files"]
		})
});

type FormValues = z.infer<typeof formSchema>;

export function ReceiptImageUpload() {
	const [isParsing, setIsParsing] = React.useState(false);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			files: []
		}
	});

	const onImageUpload = async (data: FormValues) => {
		const formData = new FormData();
		formData.append("file", data.files[0]);

		try {
			setIsParsing(true);
			const res = await parseReceiptFn({ data: formData });
			toast("Submitted values:", {
				description: (
					<pre className="mt-2 w-80 rounded-md">
						<code>{JSON.stringify(res.transactions, null, 2)}</code>
					</pre>
				)
			});
			if (!res.error) {
				setIsParsing(false);
			}
		} catch (err) {
			console.error(err);
		}
	};

	React.useEffect(() => {
		const files = form.watch("files");
		if (files && files.length > 0) {
			form.handleSubmit(onImageUpload)();
		}
	}, [form.watch("files")]);

	return (
		<div className="max-w-[430px]">
			<div className="ml-6 mb-4 mt-2">
				<Label>Scan receipt</Label>
				<p className="text-muted-foreground/50 text-xs mt-2">
					You can scan a receipt image so we can fill the form for you.
				</p>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onImageUpload)} className="w-full max-w-md px-3.5 mx-2">
					<FormField
						control={form.control}
						name="files"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<FileUpload
										value={field.value}
										onValueChange={field.onChange}
										accept="image/*"
										maxFiles={2}
										maxSize={5 * 1024 * 1024}
										onFileReject={(_, message) => {
											form.setError("files", {
												message
											});
										}}
									>
										<FileUploadDropzone className="flex-row flex-wrap border-dotted text-muted-foreground text-sm text-center">
											<CloudUpload className="size-3.5" />
											Drag and drop or
											<FileUploadTrigger asChild>
												<Button
													size="sm"
													variant="ghost"
													className="p-0 h-0 underline underline-offset-2 font-normal"
												>
													choose files
												</Button>
											</FileUploadTrigger>
											to upload
										</FileUploadDropzone>
										<FileUploadList>
											{field.value.map((file, index) => (
												<FileUploadItem key={index} value={file}>
													<FileUploadItemPreview />
													<FileUploadItemMetadata />
													{isParsing && (
														<FileUploadItemProgress variant="circular" className="animate-spin" />
													)}
													<FileUploadItemDelete asChild>
														<Button variant="ghost" size="icon" className="size-7">
															<X />
															<span className="sr-only">Delete</span>
														</Button>
													</FileUploadItemDelete>
												</FileUploadItem>
											))}
										</FileUploadList>
									</FileUpload>
								</FormControl>
								<FormDescription>Only one image is allowed,up to 5MB each.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</div>
	);
}
