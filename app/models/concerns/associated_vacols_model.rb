module AssociatedVacolsModel
  extend ActiveSupport::Concern

  class LazyLoadingDisabledError < StandardError; end

  module ClassMethods
    # vacols_attr_accessors will lazy load the underlying data from the VACOLS DB upon first call
    #
    # For example, appeal = Appeal.find(id) will *not* make any calls to load the data from VACOLS,
    # but soon as we call appeal.veteran_first_name, it will trigger the VACOLS DB lookup and fill in
    # all instance variables for the appeal. Further requests will pull the values from memory and not
    # do subsequent VACOLS DB lookups
    def vacols_attr_accessor(*fields)
      fields.each do |field|
        @vacols_fields = {} if !@vacols_fields
        @vacols_fields[field] = true

        define_method field do
          check_and_load_vacols_data! unless field_set?(field)
          instance_variable_get("@#{field}".to_sym)
        end

        define_method "#{field}=" do |value|
          @vacols_load_status = :disabled
          mark_field_is_set(field)
          instance_variable_set("@#{field}".to_sym, value)
        end
      end
    end

    def vacols_fields
      @vacols_fields ||= {}
    end

    def vacols_field?(field)
      vacols_fields[field]
    end
  end

  def field_set?(field)
    set_fields[field]
  end

  def mark_field_is_set(field)
    set_fields[field] = true
  end

  # Setter method for assigning a hash of values
  # to their corresponding instance variables
  def assign_from_vacols(values)
    values.each do |key, value|
      setter = method("#{key}=")
      setter.call(value)
    end
  end

  def check_and_load_vacols_data!
    # When we're ready to turn the error on, replace the if below with the
    # commented out error.
    # raise LazyLoadingDisabledError if @vacols_load_status == :disabled
    if @vacols_load_status == :disabled
      Rails.logger.warn "Future Error: Lazy Load triggered after VACOLS values are set."
      @vacols_load_status = nil
    end

    perform_vacols_request unless @vacols_load_status

    vacols_success?
  end

  def vacols_record_exists?
    check_and_load_vacols_data!
  end

  private

  def set_fields
    @set_fields ||= {}
  end

  def perform_vacols_request
    # Use :loading status to prevent infinite loop
    @vacols_load_status = :loading

    # Fetch and cache values from VACOLS
    # self.class.repository.load_vacols_data(self) should return truthy or false
    # which is used to store the outcome of the load
    @vacols_load_status = self.class.repository.load_vacols_data(self) ? :success : :failed
  end

  def vacols_success?
    @vacols_load_status == :success || @vacols_load_status == :disabled
  end
end
