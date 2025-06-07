import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { shortenUrl } from "@/services/short-url";
import type { AxiosError } from "axios";
import ShowShortUrl from "./ShowShortUrl";

const formSchema = z.object({
  full_url: z.string().url("Please enter a valid URL"),
})

const UrlShortenForm: React.FC = () => {
  const [shortCode, setShortCode] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_url: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setShortCode(null);

    const shortCode = await shortenUrl(values).then(res => res.short_code)
      .catch((err: AxiosError<{ errors: string[] }>) => {
        err.response?.data.errors.forEach((err) => {
          form.setError('full_url', { message: err, type: 'error' })
        })
      })

    if (shortCode) {
      setShortCode(shortCode)
      form.reset();
    }
  }

  return (
    <div className="flex flex-col w-full max-w-xl">

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col items-center gap-4 mt-10">
          <FormField
            control={form.control}
            name="full_url"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input className="!text-accent-foreground w-full rounded-xl !text-[1.2rem] !py-[1.8rem] !px-[1rem] border-border border-2" placeholder="https://example.com/long-url" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button loading={form.formState.isSubmitting} type="submit" variant="secondary" size="lg" className="text-xl p-6  w-full max-w-3xl mt-3 rounded-lg">
            Generate Short Link
          </Button>

        </form>

      </Form>

      {shortCode && <ShowShortUrl shortCode={shortCode} />}

    </div>
  );
}

export default UrlShortenForm;
