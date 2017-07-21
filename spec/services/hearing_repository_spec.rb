describe HearingRepository do
  context ".transform_hearing_info" do
    subject { HearingRepository.transform_hearing_info(info) }

    context "when all values are present" do
      let(:info) do
        { notes: "test notes",
          aod: true,
          transcript_requested: false,
          disposition: :postponed,
          hold_open: 60 }
      end

      it "should convert to Vacols values" do
        result = subject
        expect(result[:notes]).to eq "test notes"
        expect(result[:aod]).to eq :Y
        expect(result[:transcript_requested]).to eq :N
        expect(result[:disposition]).to eq :P
        expect(result[:hold_open]).to eq 60
      end
    end

    context "when some values are missing" do
      let(:info) do
        { notes: "test notes",
          aod: true }
      end

      it "should skip these values" do
        result = subject
        expect(result.values.size).to eq 2
        expect(result[:notes]).to eq "test notes"
        expect(result[:aod]).to eq :Y
      end
    end

    context "when some values do not need Vacols update" do
      let(:info) do
        { worksheet_military_service: "Vietnam 1968 - 1970" }
      end

      it "should skip these values" do
        result = subject
        expect(result.values.size).to eq 0
      end
    end
  end
end
