
import { Trash2 } from "lucide-react";

const FilterPanel = ({ filters, setFilters }) => {
  const timeSlots = [
    { id: "morning", label: "Sáng sớm 00:00 - 06:00", count: 0 },
    { id: "afternoon", label: "Buổi sáng 06:00 - 12:00", count: 2 },
    { id: "evening", label: "Buổi chiều 12:00 - 18:00", count: 9 },
    { id: "night", label: "Buổi tối 18:00 - 24:00", count: 32 },
  ];

  const vehicleTypes = ["Ghế", "Giường", "Limousine"];
  const seatClasses = ["Hạng đầu", "Hạng giữa", "Hạng cuối"];
  const floors = ["Tầng trên", "Tầng dưới"];

  const handleTimeSlotChange = (timeSlotId) => {
    const newTimeSlots = filters.timeSlots.includes(timeSlotId)
      ? filters.timeSlots.filter((id) => id !== timeSlotId)
      : [...filters.timeSlots, timeSlotId];

    setFilters({ ...filters, timeSlots: newTimeSlots });
  };

  const handleVehicleTypeChange = (type) => {
    const newTypes = filters.vehicleTypes.includes(type)
      ? filters.vehicleTypes.filter((t) => t !== type)
      : [...filters.vehicleTypes, type];

    setFilters({ ...filters, vehicleTypes: newTypes });
  };

  const clearFilters = () => {
    setFilters({
      timeSlots: [],
      vehicleTypes: [],
      seatClasses: [],
      floors: [],
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-700 font-medium text-sm uppercase tracking-wide">
          BỘ LỌC TÌM KIẾM
        </h3>
        <button
          onClick={clearFilters}
          className="flex items-center gap-1 text-red-500 text-sm hover:text-red-600"
        >
          <span>Bỏ lọc</span>
          <Trash2 size={14} />
        </button>
      </div>

      {/* Time Slots */}
      <div className="mb-6">
        <h4 className="text-gray-700 font-medium mb-3">Giờ đi</h4>
        <div className="space-y-2">
          {timeSlots.map((slot) => (
            <label key={slot.id} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.timeSlots.includes(slot.id)}
                onChange={() => handleTimeSlotChange(slot.id)}
                className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              />
              <span className="ml-2 text-sm text-gray-600">
                {slot.label} ({slot.count})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Vehicle Types */}
      <div className="mb-6">
        <h4 className="text-gray-700 font-medium mb-3">Loại xe</h4>
        <div className="flex flex-wrap gap-2">
          {vehicleTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleVehicleTypeChange(type)}
              className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                filters.vehicleTypes.includes(type)
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-600 border-gray-300 hover:border-orange-500"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Seat Classes */}
      <div className="mb-6">
        <h4 className="text-gray-700 font-medium mb-3">Hạng ghế</h4>
        <div className="flex flex-wrap gap-2">
          {seatClasses.map((seatClass) => (
            <button
              key={seatClass}
              className="px-3 py-1.5 text-sm rounded-md border bg-white text-gray-600 border-gray-300 hover:border-orange-500 transition-colors"
            >
              {seatClass}
            </button>
          ))}
        </div>
      </div>

      {/* Floors */}
      <div>
        <h4 className="text-gray-700 font-medium mb-3">Tầng</h4>
        <div className="flex flex-wrap gap-2">
          {floors.map((floor) => (
            <button
              key={floor}
              className="px-3 py-1.5 text-sm rounded-md border bg-white text-gray-600 border-gray-300 hover:border-orange-500 transition-colors"
            >
              {floor}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
