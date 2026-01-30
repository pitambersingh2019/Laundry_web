import Card from "./Card";

const SmallCard = ({ icon, label, count }) => {
    return (
        <Card className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100">
                {icon}
            </div>

            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <h3 className="text-lg font-semibold">{count}</h3>
            </div>
        </Card>
    );
};

export default SmallCard;
