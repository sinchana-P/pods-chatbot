import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function QuoteForm() {
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="p-4 pb-0">
        <Tabs defaultValue="recent">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="recent" className="text-gray-700">
              Recent Quotes
            </TabsTrigger>
            <TabsTrigger value="new" className="text-red-600">
              New Quote
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-10">
            <h2 className="text-sm font-medium">How can we help you?</h2>
            <div className="text-right text-xs text-blue-600">
              <a href="#">Try PODS For Business</a>
            </div>
          </div>

          <Tabs defaultValue="moving" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="moving">Moving</TabsTrigger>
              <TabsTrigger value="storage">Storage</TabsTrigger>
              <TabsTrigger value="both">Both</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600">Current ZIP</label>
              <Input placeholder="Enter ZIP code" />
            </div>

            <div>
              <label className="text-sm text-gray-600">Start Date</label>
              <Input type="date" />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Estimated timeframe
              </label>
              <select className="w-full p-2 border rounded">
                <option>Select timeframe</option>
                <option>Less than 1 month</option>
                <option>1-3 months</option>
                <option>3+ months</option>
              </select>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">
              Where will you keep your containers?
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="justify-start">
                My Location
              </Button>
              <Button variant="outline" className="justify-start">
                PODS Facility
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <Input type="email" placeholder="Enter your email" />
          </div>

          <Button className="w-full bg-red-600 hover:bg-red-700">
            Get a quote
          </Button>

          <div className="text-center text-sm text-blue-600">
            <a href="#">– Promo</a>
          </div>

          <div>
            <label className="text-sm text-gray-600">Promo Code</label>
            <Input placeholder="BIGGEST30" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
